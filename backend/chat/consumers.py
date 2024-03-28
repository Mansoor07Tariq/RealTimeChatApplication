
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from .models import Room,Message,User
from asgiref.sync import sync_to_async
#     'channels.middleware.AsgiRequestMiddleware',

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f"chat_{self.room_id}"

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json, text_data_json["username"])
        message = text_data_json['message']
        username = text_data_json["username"]
        room = text_data_json["room"]

        # Save message to the database asynchronously
        # await self.save(user_id, self.room_id, message)
        await self.save_message(message, username, room)     

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "chat.message", "message": message, "username": username, 'room': room},
        )

    async def chat_message(self, event):
        message = event["message"]
        user_id = event["username"]

        # Send message to WebSocket
        await self.send(
            text_data=json.dumps(
                {"message": message, "user_id": user_id}
            )
        )

    @sync_to_async
    def save_message(self, message, username, room):
        print(message, username, room, "----------------------")
        user = User.objects.get(username=username)
        room = Room.objects.get(id=room)

        Message.objects.create(user=user, room=room, content=message)
    
    @sync_to_async
    def get_previous_messages(self):
        room = Room.objects.get(id=self.room_id)
        return Message.objects.filter(room=room).order_by('timestamp')