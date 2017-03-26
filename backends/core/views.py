from rest_framework import generics, permissions
from rest_framework.exceptions import ValidationError

from .models import User, Classroom, Student
from .serializers import UserSerializer, ClassroomSerializer, StudentSerializer


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)


class UserDetail(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)


class IsTeacherForClassroom(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.teacher == request.user


class ClassroomList(generics.ListCreateAPIView):
    serializer_class = ClassroomSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        teacher = self.request.user
        return Classroom.objects.filter(teacher=teacher)

    def perform_create(self, serializer):
        teacher = self.request.user
        serializer.save(teacher=teacher)


class ClassroomDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClassroomSerializer
    permission_classes = (permissions.IsAuthenticated, IsTeacherForClassroom)


class IsTeacherForClassroomStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        classroom_id = view.kwargs['classroom_id']
        classroom = Classroom.objects.get(id=classroom_id)
        return self.has_object_permission(request, view, classroom)

    def has_object_permission(self, request, view, obj):
        return obj.classroom.teacher == request.user


class StudentListForClassroom(generics.ListCreateAPIView):
    serializer_class = StudentSerializer
    permission_classes = (permissions.IsAuthenticated, IsTeacherForClassroomStudent)

    def get_queryset(self):
        classroom_id = self.kwargs['classroom_id']
        classroom = Classroom.objects.get(id=classroom_id)
        if classroom:
            Student.objects.filter(classroom=classroom)
        else:
            Student.objects.none()

    def perform_create(self, serializer):
        classroom_id = self.kwargs['classroom_id']
        classroom = Classroom.objects.get(id=classroom_id)
        if classroom:
            return serializer.save(classroom=classroom)
        else:
            raise ValidationError('Invalid classroom_id' + classroom_id)


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentSerializer
    permission_classes = (permissions.IsAuthenticated, IsTeacherForClassroomStudent)
