import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from customerside.models import *
from .serializers import *
import datetime
from django.utils import timezone

class QueueConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        self.queue_data = await self.get_queue()

        

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'tester_message',
                'tester': self.queue_data,
            }
        )

    async def tester_message(self, event):

        tester = event.get('tester')

        await self.send(text_data=json.dumps({
            'queue_data':tester,
        }))
    

    @database_sync_to_async
    def get_queue(self):
        shop =  Shop.objects.get(id= self.room_name)
        queue = Queue.objects.filter(shop = shop , date = datetime.date.today() ,is_done = False).order_by('id')
        serializer = QueueSerializer(queue, many=True)
        shop.people_in_queue = len(queue)
        shop.next_slot = str(shop.queue_time.time())
        shop.save()  
        return serializer.data

    
    @database_sync_to_async
    def add_user_to_queue(self,personToQueue):
        shopId = personToQueue['shopId']
        shop = Shop.objects.get(id=shopId)
        if  personToQueue['customer'] is not None:
            customerId = personToQueue['customer']
            customer = CustomUser.objects.get(id=customerId)  
        else :
            customer = personToQueue['customer']  
        for service in personToQueue['service']:
            serviceId = service['id']
            shopService = ShopService.objects.get(id = serviceId)
            instance = Queue.objects.create(service = shopService, shop = shop, customer = customer)
            if timezone.make_aware(datetime.datetime.now(), timezone.get_default_timezone()) < shop.queue_time :
                instance.time =  shop.queue_time.time()
                instance.date = shop.queue_time.date()
            shop.queue_time =  shop.queue_time + datetime.timedelta(minutes = service['duration'])
            instance.save()
            shop.save()          
        queue = Queue.objects.filter(shop = shop , date = datetime.date.today() ,is_done = False).order_by('id')
        shop.people_in_queue = len(queue)
        shop.next_slot = str(shop.queue_time.time())
        shop.save()  
        serializer = QueueSerializer(queue, many=True)

        return serializer.data


    @database_sync_to_async
    def joinQueue(self,joinQueue):
        shopId = joinQueue['shopId']
        shop = Shop.objects.get(id=shopId)
        if  joinQueue['customer'] is not None:
            customerId = joinQueue['customer']
            customer = CustomUser.objects.get(id=customerId)  
        else :
            customer = joinQueue['customer']  
        for service in joinQueue['service']:
            serviceId = service['id']
            shopService = ShopService.objects.get(id = serviceId)
            instance = Queue.objects.create(service = shopService, shop = shop, customer = customer)
            if timezone.make_aware(datetime.datetime.now(), timezone.get_default_timezone()) < shop.queue_time :
                instance.time =  shop.queue_time.time()
                instance.date = shop.queue_time.date()
            shop.queue_time =  shop.queue_time + datetime.timedelta(minutes = service['duration'])
            instance.save()
            shop.save()          
        queue = Queue.objects.filter(shop = shop , date = datetime.date.today() ,is_done = False).order_by('id')
        shop.people_in_queue = len(queue)
        shop.next_slot = str(shop.queue_time.time())
        shop.save()  
        serializer = QueueSerializer(queue, many=True)
        return serializer.data


    @database_sync_to_async
    def activateUser(self,id):
        activeQueue = Queue.objects.get(id=id)
        activeQueue.is_active = True
        activeQueue.save()
        shop =  Shop.objects.get(id= self.room_name)
        queue = Queue.objects.filter(shop = shop , date = datetime.date.today(),is_done = False).order_by('id')
        queue_time = timezone.datetime.now()
        for element in queue:
            element.time = queue_time.time()
            print(element.time)
            service =  element.service
            print(service.duration)
            queue_time = queue_time + datetime.timedelta(minutes = service.duration)
            print(queue_time)
            element.save()
        shop.queue_time = queue_time
        shop.people_in_queue = len(queue)
        shop.next_slot = str(shop.queue_time.time())
        shop.save()
        serializer = QueueSerializer(queue, many=True)
        return serializer.data
    
    @database_sync_to_async
    def handleDone(self,id):
        activeQueue = Queue.objects.get(id=id)
        activeQueue.is_done = True
        activeQueue.save()
        shop =  Shop.objects.get(id= self.room_name)
        queue = Queue.objects.filter(shop = shop , date = datetime.date.today(),is_done = False).order_by('id')
        queue_time = timezone.datetime.now()
        for element in queue:
            element.time = queue_time.time()
            service =  element.service
            queue_time = queue_time + datetime.timedelta(minutes = service.duration)
            element.save()
        shop.queue_time = queue_time
        shop.people_in_queue = len(queue)
        shop.next_slot = str(shop.queue_time.time())
        shop.save()
        serializer = QueueSerializer(queue, many=True)
        return serializer.data


    @database_sync_to_async
    def handleTimeAdding(self,id):
        shop =  Shop.objects.get(id= self.room_name)
        queue = Queue.objects.filter(shop = shop , date = datetime.date.today(),is_done = False).order_by('id')
        for element in queue:
            year = element.date.year
            month = element.date.month
            day = element.date.day
            hour = element.time.hour
            minute = element.time.minute
            second = element.time.second
            queue_time = datetime.datetime(year, month, day, hour, minute, second)
            queue_time = queue_time + datetime.timedelta(minutes = 10)
            element.time = queue_time.time()
            element.save()
        serializer = QueueSerializer(queue, many=True)
        return serializer.data
        
        

    

        
 
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        personToQueue = text_data_json['personToQueue']
        activateUser = text_data_json['activateUser']
        handleDone = text_data_json['handleDone']
        handleTimeAdding = text_data_json['handleTimeAdding']
        joinQueue = text_data_json['joinQueue']
        if personToQueue:
            self.queue_data = await self.add_user_to_queue(personToQueue)
        if activateUser:
            self.queue_data = await self.activateUser(activateUser)
        if handleDone:
            self.queue_data = await self.handleDone(handleDone)
        if handleTimeAdding:
            self.queue_data = await self.handleTimeAdding(handleTimeAdding)
        if joinQueue:
            self.queue_data = await self.joinQueue(joinQueue)


           
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'tester_message',
                'tester': self.queue_data,

            }
        )

    async def chat_message(self, event):

        message = event.get('message')
       

        await self.send(text_data=json.dumps({
            'message':message,
            
        }))
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )




class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'tester_message',
                'tester': 'hello world!',
            }
        )

    async def tester_message(self, event):

        tester = event.get('tester')

        await self.send(text_data=json.dumps({
            'tester':tester,
        }))



    async def disconnect(self, close_code):

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )


    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
            }
        )

    async def chat_message(self, event):

        message = event.get('message')
        username = event.get('username')

        await self.send(text_data=json.dumps({
            'message':message,
            'username':username,
        }))




