from django.shortcuts import render
from .models import AutomobileVO, Salesperson, Customer, Sale
from .encoders import AutomobileVOEncoder, SalesPersonEncoder, CustomerEncoder, SaleEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json


@require_http_methods(["GET", "POST"])
def sales_list(request):
    if request.method == "GET":
        sale = Sale.objects.all()
        return JsonResponse(
            {"sales": sale},
            encoder = SaleEncoder
        )
    else:
        content = json.loads(request.body)
        automobile = Sale.objects.create(**content)
        return JsonResponse(
            automobile,
            encoder=SaleEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def sales_detail(request, id):
    if request.method == "GET":
        try:
            Sale.objects.get(id=id)
            return JsonResponse(
                Sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message:" "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                sale=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            sale = Sale.objects.get(id=id)

            props = ["price", "automobile", "salesperson", "customer"]
            for prop in props:
                if prop in content:
                    setattr(sale, prop, content[prop])
            sale.save()
            return JsonResponse(
                sale,
                encoder=SaleEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
