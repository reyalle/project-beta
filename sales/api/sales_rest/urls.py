from django.urls import path
from .views import sales_list, salespeople, customer_list, sales_person, customer_list, customer_detail, sale_detail

urlpatterns = [
    path("sales/", sales_list, name="sales_list"),
    path("sales/<int:id>/", sale_detail, name="sale_detail"),
    path("salespeople/", salespeople, name="salespeople"),
    path("salespeople/<int:id>/", sales_person, name="sales_person"),
    path("customers/", customer_list, name="customer_list"),
    path("customers/<int:id>/", customer_detail, name="customer_detail")
]
