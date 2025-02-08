from django.urls import path
from talktalk import views

urlpatterns = [
    path('', views.video_upload, name='video_upload'),
    path('success/', views.video_success, name='video_success'),
    path("api/user/profile/", views.user_profile, name="user-profile"),
]
