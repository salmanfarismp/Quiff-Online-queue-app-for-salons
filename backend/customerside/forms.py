from dataclasses import fields
from email.headerregistry import Address
from msilib.schema import Class
from pyexpat import model
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from .models import *

from django import forms

class UserForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = [ 'username','email','phone_number','password1','password2']

class UserUpdateForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = [ 'username','email','phone_number']