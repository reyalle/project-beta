from django.urls import path
from .views import technicians_list, technician_detail

urlpatterns = [
    path('technicians/', technicians_list, name="technicians_list"),
    path('technicians/<int:id>/', technician_detail, name="technician_detail"),
]
