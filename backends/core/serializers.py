from rest_framework import serializers

from .models import User, Student, Classroom


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'is_admin', 'is_active')


class ClassroomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classroom
        fields = ('id', 'description', 'teacher')
        read_only_fields = ('teacher',)


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'name', 'classroom')
        read_only_fields = ('classroom',)


