# ./routers.py

from rest_framework import routers

from talktalk.viewsets import VideoViewSet

router = routers.SimpleRouter()

router.register(r'menu', VideoViewSet, basename="menu")

urlpatterns = router.urls
