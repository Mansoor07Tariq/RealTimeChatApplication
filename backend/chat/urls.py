# urls.py

from django.urls import path
from .views import user_signup, user_login, create_room, get_all_rooms, get_messages

urlpatterns = [
    path('signup/', user_signup, name='user_signup'),
    path('login/', user_login, name='user_login'),
    path('create-room/', create_room, name='create-room'),
    path('get-all-rooms/', get_all_rooms, name='get_all_rooms'),
    # path('send-message/<int:room_id>/', send_message, name='send_message'),
    path('get-messages/<int:room_id>/', get_messages, name='get_messages'),
]
