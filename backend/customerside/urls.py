from django.urls import path
from . import views

urlpatterns = [
    
    path('otp_sending/',views.otp_sending),
    path('otp_checking/',views.otp_checking),
]