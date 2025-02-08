from django.urls import path
from talktalk import views

urlpatterns = [
    path('', views.video_upload, name='video_upload'),
    # A page to show after successful upload
    path('success/', views.video_success, name='video_success'),
]
