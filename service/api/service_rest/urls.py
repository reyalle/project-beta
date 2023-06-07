from django.urls import path
from .views import technicians_list, technician_detail, service_list, service_detail

urlpatterns = [
    path('technicians/', technicians_list, name="technicians_list"),
    path('technicians/<int:id>/', technician_detail, name="technician_detail"),
    path('appointments/', service_list, name="service_list"),
    path('appointments/<int:id>/', service_detail, name="service_detail"),
]
