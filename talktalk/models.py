from django.db import models
from django.contrib.auth.models import User

class Topic(models.TextChoices):
    # database value, label shown in forms or admin panel
    TECHNOLOGY = 'Technology', 'Technology'
    EDUCATION = 'Education', 'Education'
    ENTERTAINMENT = 'Entertainment', 'Entertainment'
    SCIENCE = 'Science', 'Science'
    SPORTS = 'Sports', 'Sports'
    ART = 'Art', 'Art'
    MUSIC = 'Music', 'Music'
    OTHER = 'Other', 'Other'

class Level(models.TextChoices):
    BEGINNER = 'Beginner', 'Beginner'
    INTERMEDIATE = 'Intermediate', 'Intermediate'
    ADVANCED = 'Advanced', 'Advanced'
    EXPERT = 'Expert', 'Expert'

class Video(models.Model):
    title = models.CharField(max_length=255)
    topic = models.CharField(
        max_length=20,  # Adjust max length to fit your enum choices
        choices=Topic.choices,
        default=Topic.OTHER,  # Default to 'Other' if not specified
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video_file = models.FileField(upload_to='videos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    level = models.CharField(
        max_length=20,  # Adjust max length to fit your enum choices
        choices=Level.choices,
        default=Level.BEGINNER,  # Default to 'Beginner' if not specified
    )

    def __str__(self):
        return f'{self.title} - {self.topic} - {self.level}'
