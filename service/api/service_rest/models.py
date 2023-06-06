from django.db import models

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.last_name

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=50)
    vin = models.CharField(max_length=17, unique=True)
    customer = models.CharField(max_length=50)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
    )
