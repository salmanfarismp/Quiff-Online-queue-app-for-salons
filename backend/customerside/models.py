from calendar import SUNDAY
from datetime import date
from operator import countOf
from django.utils import timezone
from tkinter import Image
from unicodedata import name
from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
from django.core.validators import RegexValidator
# Create your models here.
class CustomUser(AbstractUser):
    phone_regex = RegexValidator(regex=r'^1?\d{9,15}$', message="Invalid Phone Number")
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=False, null=True) # validators should be a list
    is_businessOwner = models.BooleanField(default=False)
    is_shopVerified = models.BooleanField(default=False, null=True)

    def __str__(self):
        return str(self.username)


class Notification(models.Model):
    name = models.CharField(max_length=50, null=True, blank=True)
    @property
    def requests_count(self):
        
        shops = self.shop_set.all()
        total = countOf([shop.verification_process == 'verificatonRequested' for shop in shops])
        return total


class Shop(models.Model):
    shop_types = (
        ( 'HairSalon', 'Hair Salon'),
        ('BeautySalon', 'Beauty Salon'),
       
        
    )
    gender_types = (
        ( 'male', 'male'),
        ('female', 'female'),
        ('mixed', 'mixed'),
        
    )
    verification_steps = (

        ( 'none', 'none'),
        ( 'verificatonRequested', 'verificatonRequested'),
        ('verificationApproved', 'verificationApproved'),
        ('menuCreated', 'menuCreated'),
        ('planSelected', 'planSelected'),
        ('verificationDone', 'verificationDone'),
        
    )
    
    name = models.CharField(max_length=50)
    fullname = models.CharField(max_length=150 ,null=True, blank=True)
    owner = models.OneToOneField(CustomUser,null=True, blank=True,on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=shop_types, default='HairSalon')
    gender = models.CharField(max_length=20, choices=gender_types, default='Male')
    complete_address = models.CharField(max_length=200)
    search_location = models.CharField(max_length=200,null=True)
    latitude = models.CharField(max_length=200,null=True)
    longitude = models.CharField(max_length=200,null=True)
    locality = models.CharField(max_length=200,null=True)
    pin_code = models.CharField(max_length=200,null=True)
    state = models.CharField(max_length=50,null=True)
    nation = models.CharField(max_length=50,null=True)
    phone_regex = RegexValidator(regex=r'^1?\d{9,15}$', message="Invalid Phone Number")
    contact_number = models.CharField(validators=[phone_regex], max_length=17, blank=False, null=True)
    opening_time = models.TimeField()
    closing_time = models.TimeField()
    temp_closing_time = models.TimeField(null=True, blank=True)
    shop_certificate= models.ImageField(upload_to='shopmenus', null=True, blank=True)
    is_open = models.BooleanField(default=False)
    main_image = models.ImageField(upload_to='shopImages', null=True,blank=True)
    verified = models.BooleanField(default=False)
    verification_process = models.CharField(max_length=20, choices=verification_steps, default='verificatonRequested')
    queue_time = models.DateTimeField(null=True,blank=True)
    next_slot = models.CharField(max_length=20,default='Free Now!', null=True)
    people_in_queue = models.IntegerField(default=0,null=True)

    def __str__(self):
        return str(self.name)
    

class ShopHolidays(models.Model):

    is_sunday = models.CharField(default='true',max_length=8)
    is_monday = models.CharField(default='true',max_length=8)
    is_tuesday = models.CharField(default='true',max_length=8)
    is_wednesday = models.CharField(default='true',max_length=8)
    is_thursday = models.CharField(default='true',max_length=8)
    is_friday = models.CharField(default='true',max_length=8)
    is_saturday = models.CharField(default='true',max_length=8)
    shop = models.OneToOneField(Shop, on_delete=models.CASCADE, null=True)

class Bookmarks(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)





class CustomerPayment(models.Model):
    payment_types = (
        ( 'Razorpay', 'razorpay'),
        ('paypal', 'paypal'),    
    )
    payment_status = (
        ( 'success', 'success'),
        ('processing', 'processing'),
        ('failed', 'failed'),
        ('refundRequired', 'refundRequired'),
        ('refunded', 'refunded'),
        
    )
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL,null=True)
    shop = models.ForeignKey(Shop, on_delete=models.SET_NULL,null=True)
    payment_type = models.CharField(max_length=20,choices=payment_types)
    payment_status = models.CharField(max_length=20 ,choices=payment_status)
    transaction_id = models.CharField(max_length= 100, null=True, blank=True)
    paid_date = models.DateTimeField(auto_now_add=True,null=True)
    payment_id = models.CharField(max_length= 100, null=True)

class Plans(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=30,null=True, blank=True)
    duration = models.IntegerField()
    price = models.IntegerField()

class ShopPayment(models.Model):
    payment_types = (
        ( 'razorpay', 'razorpay'),
        ('paypal', 'paypal'),    
    )
    payment_status = (
        ( 'success', 'success'),
        ('processing', 'processing'),
        ('Failed', 'failed'),
        ('RefundRequired', 'refund required'),
        ('Refunded', 'refunded'),
        
    )
    plan = models.ForeignKey(Plans, on_delete=models.SET_NULL ,null=True)
    shop = models.ForeignKey(Shop, on_delete=models.SET_NULL,null=True)
    payment_type = models.CharField(max_length=20,choices=payment_types,null=True)
    payment_status = models.CharField(max_length=20 ,choices=payment_status,null=True)
    transaction_id = models.CharField(max_length= 100,null=True, blank=True)
    paid_date = models.DateTimeField(auto_now_add=True,null=True, blank=True)
    payment_id = models.CharField(max_length= 100, null=True)

class Service(models.Model):
    name = models.CharField(max_length=50)
    default_duration = models.IntegerField(default=0)
    default_price = models.CharField(max_length=50)

    def __str__(self):
        return str(self.name)

class ShopService(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    duration = models.IntegerField(default=0)
    price = models.CharField(max_length=50)
   

class Queue(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    customer = models.ForeignKey(CustomUser, on_delete=models.SET_NULL ,null=True)
    is_active = models.BooleanField(default=False)
    is_done = models.BooleanField(default=False)
    date = models.DateField(default= timezone.datetime.today)
    time = models.TimeField(default= timezone.datetime.now)
    service = models.ForeignKey(ShopService, on_delete=models.SET_NULL, null=True)

class Feedback(models.Model):
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    description = models.CharField(max_length=30,null=True)


class ShopRating(models.Model):
    rating_choices = (
        ( 1,1),
        ( 2,2),
        ( 3,3),
        ( 4,4),
        ( 5,5),
        
        
    )
    customer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    rating = models.IntegerField(default=5,choices=rating_choices)





    



