from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def get_api_url(self):
        return reverse("sales_person", kwargs={"pk": self.id})


class Customers(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)

    def get_api_url(self):
        return reverse("customer_detail", kwargs={"pk": self.id})


class Sale(models.Model):
    price = models.IntegerField()

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.CASCADE
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customers,
        related_name="customer",
        on_delete=models.CASCADE
    )

    def get_api_url(self):
        return reverse("sale_detail", kwargs={"pk": self.id})
