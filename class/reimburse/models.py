from django.db import models

class Reimbursement(models.Model):
    description = models.CharField(max_length=200)
    request_date = models.DateTimeField('date requested')

    def __str__(self):
        return self.description
