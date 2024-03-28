from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import MessageSerializer, UserSerializer, UserLoginSerializer, RoomSerializer
from rest_framework.authtoken.models import Token
from .models import Message, Room
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@api_view(['POST'])
@permission_classes([AllowAny])
def user_signup(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def user_login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key, 'message': 'Login successful'}, status=status.HTTP_200_OK)
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_room(request):
    if request.method == 'POST':
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_rooms(request):
    if request.method == 'GET':
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_messages(request, room_id):
    if request.method == 'GET':
        try:
            room = Room.objects.get(id=room_id)
        except Room.DoesNotExist:
            return Response({'message': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

        messages = Message.objects.filter(room=room_id)
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def send_message(request, room_id):
#     if request.method == 'POST':
#         try:
#             room = Room.objects.get(id=room_id)
#         except Room.DoesNotExist:
#             return Response({'message': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

#         serializer = MessageSerializer(
#             data={'user': request.user.id, 'room': room_id, 'content': request.data.get('content')}
#         )
#         if serializer.is_valid():
#             serializer.save()

#             # Trigger WebSocket event to notify clients
#             channel_layer = get_channel_layer()
#             async_to_sync(channel_layer.group_send)(
#                 f"chat_{room_id}",
#                 {
#                     'type': 'chat.message',
#                     'message': serializer.data['content'],
#                     'user_id': request.user.id,
#                 },
#             )

#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




