from pyexpat import model
from urllib import request
from attr import fields
from rest_framework import serializers
from customerside.models import *




class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'







class CheckUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

    print('salman')

    def validate(self, attrs):
        print('attrs')
        if CustomUser.objects.filter(phone_number=attrs['phone']).exists():
            raise serializers.ValidationError(
                {"number": "Number already exits."})
        if CustomUser.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError(
                {"email": "User with same email already exits."})
        if CustomUser.objects.filter(username=attrs['username']).exists():
            raise serializers.ValidationError(
                {"username": "user with same username already exits."})
        return attrs

class CustomUserForEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [ 'is_active']



class PlansSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plans
        fields = '__all__'


        

# class ShopSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Shop
#         fields = ['id', 'name', 'fullname','type','gender','is_open','main_image']

class SingleShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'






class CreateShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'


############################## right Things

class ShopPaymentSerializer(serializers.ModelSerializer):
    paid_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = ShopPayment
        fields = '__all__'
        depth = 2
    

class CustomerPaymentSerializer(serializers.ModelSerializer):
    paid_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")

    class Meta:
        model = ShopPayment
        fields = '__all__'
        depth = 2





class ShopForTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['id', 'name', 'type', 'gender', 'locality','complete_address', 'state', 'verification_process']

class ShopViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['id', 'name', 'type', 'gender', 'locality', 'state', 'main_image', ]

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
class ServiceNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id','name',]

class ShopServiceSerializer(serializers.ModelSerializer):
    service = ServiceNameSerializer()
    class Meta:
        model = ShopService
        fields = '__all__'

class CustomerSecureSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'username']


class QueueSerializer(serializers.ModelSerializer):
    service = ShopServiceSerializer()
    customer = CustomerSecureSerializer()
    class Meta:
        model = Queue
        fields = '__all__'