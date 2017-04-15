from django.db import models


class Drawing(models.Model):
    student = models.ForeignKey('core.Student')
    data = models.TextField

