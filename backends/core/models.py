from django.contrib.auth.models import User
from django.db import models


class Classroom(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()

    def __str__(self):
        return "Classroom[{}]: (t: {}) {}".format(self.id, self.teacher.id, self.description)


class Student(models.Model):
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return "Student[{}]: (c: {}) {}".format(self.id, self.classroom.id, self.name)
