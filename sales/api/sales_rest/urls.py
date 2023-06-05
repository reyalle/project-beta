from django.urls import path
from .views import sales_list

urlpatterns = [
    path("sales/", sales_list, name="sales_list"),
]
