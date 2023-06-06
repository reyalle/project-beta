from django.urls import path
from .views import sales_list, salespeople, customer_list, salesperson_detail, customer_list, customer_detail, sales_detail

urlpatterns = [
    path("sales/", sales_list, name="sales_list"),
    path("sales/<int:id>", sales_detail, name="sales_detail"),
    path("salespeople/", salespeople, name="salespeople"),
    path("salespeople/<int:id>/", salesperson_detail, name="salesperson_detail"),
    path("customers/", customer_list, name="customer_list"),
    path("customers/<int:id>/", customer_detail, name="customer_detail")
]
