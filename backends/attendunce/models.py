from django.db import models

class Meeting(models.Model):
    date = models.DateField()

# Attendunce Records Class
class AttendanceRecord(models.Model):
    teacher = models.ForeignKey('core.User', on_delete=models.CASCADE)
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE)
