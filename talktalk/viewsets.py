from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from talktalk.models import Video

from talktalk.serializers import VideoSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [AllowAny]
