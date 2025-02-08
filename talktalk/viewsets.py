from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from talktalk.models import Video

from talktalk.serializers import MenuSerializer


class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [AllowAny]
