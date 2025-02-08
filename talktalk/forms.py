from django import forms
from .models import Video

class VideoForm(forms.ModelForm):
    class Meta:
        model = Video
        fields = ['title', 'topic', 'user', 'video_file', 'level']
        widgets = {
            'user': forms.HiddenInput(),
        }
