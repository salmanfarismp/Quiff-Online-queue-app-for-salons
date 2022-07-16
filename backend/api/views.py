from curses.ascii import SI
from tkinter import E
from rest_framework import status
import razorpay
import json
from decouple import config
from rest_framework.response import Response
from rest_framework.decorators import api_view ,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from customerside.models import *
from .serializers import *
from django.http import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from customerside.forms import *
from rest_framework import generics
from django.utils import timezone
# from binascii import a2b_base64
# import PIL.Image as Image
# import  io
# import base64



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['phone_number'] = user.phone_number
        token['is_superuser'] = user.is_superuser
        token['is_businessOwner'] = user.is_businessOwner
        token['is_shopVerified'] = user.is_shopVerified
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['phone_number'] = user.phone_number
        token['is_superuser'] = user.is_superuser
        token['is_businessOwner'] = user.is_businessOwner
        token['is_shopVerified'] = user.is_shopVerified
        # ...

        return token

class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer

@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
        '/api/usertable/'  
        '/api/add/',
        '/api/usertoken/',
        '/api/usertoken/refresh/', 
        '/api/users/',
        '/api/cred/<int:pk>',
    ]
    return Response(routes)


@api_view(['GET'])
def get_data(request):
    users = CustomUser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_data(request):
    serializer = CustomUserSerializer(data=request.data)
    email = request.data['email']
    username = request.data['username']
    phone_number = request.data['phone_number']
    password = request.data['password']
    if serializer.is_valid():
        CustomUser.objects.create_user(username=username,email=email, phone_number=phone_number,password=password)
    else:
        serializer.errors
    return Response(serializer.data)

class UserList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class=CustomUserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class=CustomUserSerializer



@api_view(['GET'])
def get_shops(request):
    shops = Shop.objects.all()
    serializer = ShopSerializer(shops, many=True)
    return Response(serializer.data)





@api_view(['get'])
def notifications(request):
    queryset = Notification.objects.all()
    serializer=NotificationSerializer(queryset)
    return Response(serializer.data)



    




@api_view(['POST'])
def create_shop(request):
   
    try:
        shop_image = request.data['shopImg']
        certificate_image =  request.data['shopLicense']
        name = request.data['shopName']
        fullname = request.data['shopDescription']
        type = request.data['shopType']
        gender = request.data['shopGender']
        complete_address = request.data['shopAddress']
        search_location = request.data['shopPlaceSearch']
        latitude = request.data['shopLat']
        longitude = request.data['shopLng']
        locality = request.data['shopLocPlace']
        pin_code = request.data['shopPinCode']
        state = request.data['shopState']
        nation = request.data['shopCountry']
        contact_number = request.data['shopPhone']
        opening_time = request.data['openTime']
        closing_time = request.data['closingTime']
        shop_certificate = certificate_image
        main_image = shop_image
        is_sunday = request.data['open_sunday']
        is_monday = request.data['open_monday']
        is_tuesday = request.data['open_tuesday']
        is_wednesday = request.data['open_wednesday']
        is_thursday = request.data['open_thursday']
        is_friday = request.data['open_friday']
        is_saturday = request.data['open_saturday']
        username = request.data['ownerUsername']
        email = request.data['ownerEmail']
        phone_number = request.data['ownerPhone']
        password = request.data['ownerPassword']

        owner = CustomUser.objects.create_user(username=username, email=email,
        phone_number=phone_number,password=password,is_businessOwner=True
        )
        shop = Shop.objects.create(name=name,fullname=fullname,type=type,gender=gender,
        complete_address=complete_address,search_location=search_location,
        latitude=latitude,longitude=longitude,locality=locality,
        pin_code=pin_code,state=state,nation=nation,contact_number=contact_number,
        opening_time=opening_time,closing_time=closing_time,shop_certificate=shop_certificate,
        owner=owner,main_image=main_image)
        
        ShopHolidays.objects.create(shop=shop,is_sunday=is_sunday,is_monday=is_monday,
        is_tuesday=is_tuesday,is_wednesday=is_wednesday,is_thursday=is_thursday,
        is_friday=is_friday,is_saturday=is_saturday)
        
        return Response('shopCreated')
    except:
        return Response('Some Error Occured')


@api_view(['POST'])
def check_user(request):
    print(request.data.get('password'))
    phone_number = request.data['phone_number']
    username = request.data['username']
    email = request.data['email']
   
    if CustomUser.objects.filter(phone_number=phone_number).exists():
        return Response('User exists with this phone number')
    if CustomUser.objects.filter(email=email).exists():
        return Response('User exists with this email')
    if CustomUser.objects.filter(username=username).exists():
        return Response('User exists with this username')
    return Response('done')
   
    


################################################ right things


######################### Admin Side ###################################



class PlansManagement(generics.RetrieveUpdateDestroyAPIView):
    queryset = Plans.objects.all()
    serializer_class=PlansSerializer

class PlansView(generics.ListCreateAPIView):
    queryset = Plans.objects.all()
    serializer_class=PlansSerializer

class ServicesManagement(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class=ServiceSerializer

class ServicesView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class=ServiceSerializer



class CustomersManagement(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.filter(is_superuser=False)
    serializer_class=CustomUserForEditSerializer

class CustomersView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.filter(is_businessOwner=False).filter(is_superuser=False)
    serializer_class=CustomUserSerializer

class ShopsView(generics.ListCreateAPIView):
    queryset = Shop.objects.all()
    serializer_class=ShopViewSerializer




##########   shop side   ##########

# shop creation process


@api_view(['PUT'])
def all_set_for_shop(request,id):
    try:
        queryset = Shop.objects.get(owner__id = id)
    except:
        return Response('Page not found',status=status.HTTP_404_NOT_FOUND)
    
    user = CustomUser.objects.get(id = id)
    user.is_shopVerified = True
    queryset.verification_process = 'verificationDone'
    queryset.verified = True
    user.save()
    queryset.save()
    return Response('success',status=status.HTTP_200_OK)
    

@api_view(['GET'])
def get_shop_for_process(request,id):
    try:
        queryset = Shop.objects.get(owner__id = id)
    except:
        return Response('Page not found',status=status.HTTP_404_NOT_FOUND)
    
    serializer = ShopForTableSerializer(queryset)
    return Response(serializer.data)
    
class ServicesView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer


@api_view(['GET'])
def shop_home(request,id):
    try:
        queryset = Shop.objects.get(owner__id = id)
    except:
        return Response('Page not found',status=status.HTTP_404_NOT_FOUND)
    
    serializer = ShopSerializer(queryset)
    return Response(serializer.data)
    


@api_view(['POST'])
def create_shop_services(request):
    try:
        ownerId = request.data['shopOwner']
        services = request.data['selectedServices']
        shop = Shop.objects.get(owner__id=ownerId)
        print(shop)
        for service in services:
            print(service['id'])
            serviceClass = Service.objects.get(id=service['id'])
            print(serviceClass)
            ShopService.objects.create(shop=shop,service=serviceClass,
            duration=service['default_duration'],price=service['default_price'])
        shop.verification_process = 'menuCreated'
        shop.save()
        return Response('OK',status=status.HTTP_200_OK)
    except:
        return Response('Page not found',status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def shop_opening(request,id):
    try:

        shop =  Shop.objects.get(id=id)
        shop.is_open =True
        shop.queue_time = timezone.datetime.now()
        shop.temp_closing_time = shop.closing_time
        shop.save()
        serializer = ShopSerializer(shop)
        return Response(serializer.data)
    except:
        return Response('Page not found',status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def shop_services(request,id):
    try:

        shop =  Shop.objects.get(id=id)
        services = ShopService.objects.filter(shop=shop)
        serializer = ShopServiceSerializer(services, many=True)
        return Response(serializer.data)
    except:
        return Response('Page not found',status=status.HTTP_404_NOT_FOUND)




##########   admin side   ##########

# shop management

@api_view(['GET'])
def get_single_shop(request,id):   
    try:
        shop = Shop.objects.get(id=id)
    except:
         return Response('Page not found',status=status.HTTP_404_NOT_FOUND)
    serializer = ShopSerializer(shop)
    return Response(serializer.data, status=status.HTTP_200_OK)

class ShopsView(generics.ListCreateAPIView):
    queryset = Shop.objects.filter(verified=True)
    serializer_class=ShopSerializer


@api_view(['GET'])
def get_shops_to_verify(request):
    queryset = Shop.objects.filter(verification_process='verificatonRequested')
    serializer = ShopForTableSerializer(queryset, many=True)
    return Response(serializer.data ,status=status.HTTP_200_OK)


@api_view(['GET'])
def get_owner_of_shop(request,id):
    try:
        queryset = Shop.objects.get(id=id)
    except:
        return Response('Page not found',status=status.HTTP_404_NOT_FOUND)
    owner = queryset.owner
    if(owner):
        serializer = CustomUserSerializer(owner)
        return Response(serializer.data)
    else:
        return Response('Page not found',status=status.HTTP_404_NOT_FOUND)


class ShopDetailAPIView(generics.RetrieveAPIView):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer


@api_view(['PUT'])
def approve_shop(request,id): 
    try:
        queryset = Shop.objects.get(id=id)
        queryset.verification_process = 'verificationApproved'
        queryset.save()
    except:
        return Response('Page not found',status=status.HTTP_404_NOT_FOUND)
    return Response('OK',status=status.HTTP_200_OK)






@api_view(['POST'])
def start_payment(request):
    # request.data is coming from frontend
    ownerId = request.data['ownerId']
    planId = request.data['planId']
    print(ownerId,planId)
    shop = Shop.objects.get(owner__id = ownerId)
    plan = Plans.objects.get(id = planId)
    amount = plan.price
    print(config('RAZORPAY_PUBLIC_KEY'), config('RAZORPAY_SECRET_KEY'))


    # setup razorpay client this is the client to whome user is paying money that's you
    client = razorpay.Client(auth=(config('RAZORPAY_PUBLIC_KEY'), config('RAZORPAY_SECRET_KEY')))


    # create razorpay order
    # the amount will come in 'paise' that means if we pass 50 amount will become
    # 0.5 rupees that means 50 paise so we have to convert it in rupees. So, we will 
    # mumtiply it by 100 so it will be 50 rupees.
    payment = client.order.create({"amount": int(amount) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})

    # we are saving an order with isPaid=False because we've just initialized the order
    # we haven't received the money we will handle the payment succes in next 
    # function
    order = ShopPayment.objects.create(plan=plan,shop=shop, payment_id=payment['id'], payment_type='razorpay',payment_status='processing')

    serializer = ShopPaymentSerializer(order)

    """order response will be 
    {'id': 17, 
    'order_date': '23 January 2021 03:28 PM', 
    'order_product': '**product name from frontend**', 
    'order_amount': '**product amount from frontend**', 
    'order_payment_id': 'order_G3NhfSWWh5UfjQ', # it will be unique everytime
    'isPaid': False}"""

    data = {
        "payment": payment,
        "order": serializer.data
    }
    return Response(data)


@api_view(['POST'])
def handle_payment_success(request):
    # request.data is coming from frontend
    res = json.loads(request.data["response"])

    """res will be:
    {'razorpay_payment_id': 'pay_G3NivgSZLx7I9e', 
    'razorpay_order_id': 'order_G3NhfSWWh5UfjQ', 
    'razorpay_signature': '76b2accbefde6cd2392b5fbf098ebcbd4cb4ef8b78d62aa5cce553b2014993c0'}
    this will come from frontend which we will use to validate and confirm the payment
    """

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    # res.keys() will give us list of keys in res
    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]

    # get order by payment_id which we've created earlier with isPaid=False
    order = ShopPayment.objects.get(payment_id=ord_id)

    # we will pass this whole data in razorpay client to verify the payment
    # data = {
    #     'razorpay_order_id': ord_id,
    #     'razorpay_payment_id': raz_pay_id,
    #     'razorpay_signature': raz_signature
    # }

    client = razorpay.Client(auth=(config('RAZORPAY_PUBLIC_KEY'), config('RAZORPAY_SECRET_KEY')))

    # checking if the transaction is valid or not by passing above data dictionary in 
    # razorpay client if it is "valid" then check will return None
    # check = client.utility.verify_payment_signature(data)

    # if check is not None:
    #     print("Redirect to error url or error page")
    #     return Response({'error': 'Something went wrong'})

    # if payment is successful that means check is None then we will turn isPaid=True
    order.payment_status = 'success'
    order.transaction_id = raz_pay_id
    order.save()
    order.shop.verification_process ='planSelected'
    order.shop.save()

    res_data = {
        'message': 'payment successfully received!'
    }

    return Response(res_data)





@api_view(['POST'])
def start_customer_payment(request):
    # request.data is coming from frontend
    userId = request.data['userId']
    user = CustomUser.objects.get(id=userId)
    shopId = request.data['shopId']
    shop = Shop.objects.get(id = shopId)
    amount = 10
    print(config('RAZORPAY_PUBLIC_KEY'), config('RAZORPAY_SECRET_KEY'))


    # setup razorpay client this is the client to whome user is paying money that's you
    client = razorpay.Client(auth=(config('RAZORPAY_PUBLIC_KEY'), config('RAZORPAY_SECRET_KEY')))


    # create razorpay order
    # the amount will come in 'paise' that means if we pass 50 amount will become
    # 0.5 rupees that means 50 paise so we have to convert it in rupees. So, we will 
    # mumtiply it by 100 so it will be 50 rupees.
    payment = client.order.create({"amount": int(amount) * 100, 
                                   "currency": "INR", 
                                   "payment_capture": "1"})

    # we are saving an order with isPaid=False because we've just initialized the order
    # we haven't received the money we will handle the payment succes in next 
    # function
    order = CustomerPayment.objects.create(user=user,shop=shop, payment_id=payment['id'], payment_type='razorpay',payment_status='processing')

    serializer = CustomerPaymentSerializer(order)

    """order response will be 
    {'id': 17, 
    'order_date': '23 January 2021 03:28 PM', 
    'order_product': '**product name from frontend**', 
    'order_amount': '**product amount from frontend**', 
    'order_payment_id': 'order_G3NhfSWWh5UfjQ', # it will be unique everytime
    'isPaid': False}"""

    data = {
        "payment": payment,
        "order": serializer.data
    }
    return Response(data)


@api_view(['POST'])
def customer_payment_success(request):
    # request.data is coming from frontend
    res = json.loads(request.data["response"])

    """res will be:
    {'razorpay_payment_id': 'pay_G3NivgSZLx7I9e', 
    'razorpay_order_id': 'order_G3NhfSWWh5UfjQ', 
    'razorpay_signature': '76b2accbefde6cd2392b5fbf098ebcbd4cb4ef8b78d62aa5cce553b2014993c0'}
    this will come from frontend which we will use to validate and confirm the payment
    """

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    # res.keys() will give us list of keys in res
    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]

    # get order by payment_id which we've created earlier with isPaid=False
    order = CustomerPayment.objects.get(payment_id=ord_id)

    # we will pass this whole data in razorpay client to verify the payment
    # data = {
    #     'razorpay_order_id': ord_id,
    #     'razorpay_payment_id': raz_pay_id,
    #     'razorpay_signature': raz_signature
    # }

    client = razorpay.Client(auth=(config('RAZORPAY_PUBLIC_KEY'), config('RAZORPAY_SECRET_KEY')))

    # checking if the transaction is valid or not by passing above data dictionary in 
    # razorpay client if it is "valid" then check will return None
    # check = client.utility.verify_payment_signature(data)

    # if check is not None:
    #     print("Redirect to error url or error page")
    #     return Response({'error': 'Something went wrong'})

    # if payment is successful that means check is None then we will turn isPaid=True
    order.payment_status = 'success'
    order.transaction_id = raz_pay_id
    order.save()
    order.shop.verification_process ='planSelected'
    order.shop.save()

    res_data = {
        'message': 'payment successfully received!'
    }

    return Response(res_data)