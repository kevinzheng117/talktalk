from rest_framework import serializers

from talktalk.models import Video


class VideoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = ['title', 'topic', 'user', 'video_file', 'level']
        read_only_fields = ['title', 'user']
