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
                status=404,
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
                status=404,
            )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse(
            {"Technician is deleted": count > 0}
        )
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(id=id)
            for key, value in content.items():
               setattr(technician, key, value)
            technician.save()
            technician = Technician.objects.get(id=id)
            Technician.objects.filter(id=id).update(**content)
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


@require_http_methods(["GET", "POST"])
def service_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        content["status"] = "Scheduled"
        try:
            technician = Technician.objects.get(employee_id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "No Technician assigned to service appointment."},
                status=404,
            )
        if AutomobileVO.objects.filter(vin=content["vin"]):
            content["sold"] = True
        else:
            content["sold"] = False
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def service_detail(request, id):
    if request.method == "GET":
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Appointment.objects.get(id=id).delete()
        return JsonResponse({"Appointment Deleted": count > 0})
    else:
        try:
            content = json.loads(request.body)
            appointment = Appointment.objects.get(id=id)
            Appointment.objects.filter(id=id).update(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "No Appointment to update."},
                status=404,
            )
