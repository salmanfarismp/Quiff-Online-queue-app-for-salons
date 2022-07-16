from django.urls import path, include
from . import views
from .views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [

    path('customer/',include('customerside.urls')),

    path('',views.get_routes),
    path('add/',views.add_data),
    path('usertable/',views.get_data),
    path('usertoken/', UserTokenObtainPairView.as_view(), name='user_token_obtain_pair'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('usertoken/refresh/', TokenRefreshView.as_view(), name='user_token_refresh'),
    path('users/',views.UserList.as_view()),
    path('cred/<int:pk>',views.UserDetail.as_view()),


    
    
    
    path('shops',views.get_shops),
    path('check_user/',views.check_user),
    
    path('create_shop/',views.create_shop),




    ##################### admin side #####################


    path('plansManagement/<int:pk>',views.PlansManagement.as_view()),
    path('plansView',views.PlansView.as_view()),
    path('customersManagement/<int:pk>',views.CustomersManagement.as_view()),
    path('customersView',views.CustomersView.as_view()),
    path('servicesManagement/<int:pk>',views.ServicesManagement.as_view()),
    path('servicesView',views.ServicesView.as_view()),
    path('notifications',views.notifications),

    ############################## right things



    ##########   shop side   ##########

        path('customer_pay/', views.start_customer_payment),
    path('customer_payment/success/', views.customer_payment_success), 

    path('shop_pay/', views.start_payment),
    path('shop_payment/success/', views.handle_payment_success),  
    path('single_shop/<int:id>',views.get_single_shop),
    path('all_set_for_shop/<int:id>/',views.all_set_for_shop),
    path('get_shop_for_process/<int:id>/',views.get_shop_for_process),
    path('shop_home/<int:id>/',views.shop_home),
    path('services',views.ServicesView.as_view()),
    path('create_shop_services',views.create_shop_services),
    path('shop_opening/<int:id>/',views.shop_opening),
    path('shop_services/<int:id>/',views.shop_services),
    

    ##########   admin side   ##########

    # shop management
    path('shopsView',views.ShopsView.as_view()),
    path('get_shops_to_verify',views.get_shops_to_verify),
    path('get_owner_of_shop/<int:id>',views.get_owner_of_shop),
    path('get_shop/<int:pk>/',views.ShopDetailAPIView.as_view()), 
    path('approve_shop/<int:id>',views.approve_shop),

]   