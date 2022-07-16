from django.contrib import admin
from customerside.models import *

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Shop)
admin.site.register(Bookmarks)
admin.site.register(CustomerPayment)
admin.site.register(Plans)
admin.site.register(ShopPayment)
admin.site.register(Queue)
admin.site.register(Feedback)
admin.site.register(ShopRating)
admin.site.register(ShopHolidays)
admin.site.register(Notification)
admin.site.register(Service)
admin.site.register(ShopService)
