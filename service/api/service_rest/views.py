from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    AutomobileVOEncoder,
    TechnicianEncoder,
    AppointmentEncoder,
)
from .models import AutomobileVO, Technician, Appointment

# Create your views here.

@require_http_methods(["GET", "POST"])
def technicians_list(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder
        )
    else:
        try:
            data= json.loads(request.body)
            technician = Technician.objects.create(**data)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,

            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Employee ID"},
                status=400,
            )

@require_http_methods(["GET", "PUT", "DELETE"])
def technician_detail(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Employee does not exist."},
                status=400,
            )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse(
            {"Technician is deleted": count > 0}
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.get(id=id)
            props = ["first_name", "last_name", "employee_id"]
            for prop in props:
                if prop in props:
                    setattr(technician, prop, content[prop])
                    technician.save()
                    return JsonResponse(
                        technician,
                        encoder=TechnicianEncoder,
                        safe=False,
                    )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician could not be updated."},
                status=404,
            )
