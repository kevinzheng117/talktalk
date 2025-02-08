from rest_framework import routers

from talktalk.viewsets import VideoViewSet

router = routers.SimpleRouter()

router.register(r'video', VideoViewSet, basename="video")

urlpatterns = router.urls
