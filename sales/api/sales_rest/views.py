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
            {"sale": sale},
            encoder = SaleEncoder,
        )
    else:
        content = json.loads(request.body)
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def sales_detail(request, id):
    if request.method == "GET":
        try:
            Sale.objects.get(id=id)
            return JsonResponse(
                SaleEncoder,
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


@require_http_methods(["GET", "POST"])
def salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salespeople = Salesperson.objects.create(**content)
        return JsonResponse(
            salespeople,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def salesperson_detail(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.object.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.get(id=id)

            props = ["first_name", "last_name", "employee_id"]
            for prop in props:
                if prop in content:
                    setattr(salesperson, prop, content[prop])
            salesperson.save()
            return JsonResponse(
                salesperson,
                encoder=Salesperson,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"Message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def customer_list(request):
    if request.method == "GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def customer_detail(request, id):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder =CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"Message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"Message": "Does not exist"})
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=id)

            props = ["first_name", "last_name", "address", "phone_number"]
            for prop in props:
                if prop in content:
                    setattr(customer, prop, content[prop])
            customer.save()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
