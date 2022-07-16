from django.shortcuts import render
from rest_framework.decorators import api_view ,permission_classes
from rest_framework.response import Response

# Create your views here.
from .otp import *

@api_view(['POST'])
def otp_sending(request):
    print(request.data)
    phone_number = request.data['phone_number']   
    print(phone_number)
    try:
        print('phone_number')
        status = otp_login_code(request,phone_number)
        print(status)
        return Response(status)
    except:
        return Response("Some Error Occured")


@api_view(['POST'])
def otp_checking(request):
    phone_number = request.data['phone_number'] 
    otp = request.data['otp']  
    try:
        status = otp_verify_code(request,phone_number,otp)      
        return Response(status)
      
    except:
        return Response("Some Error Occured")

