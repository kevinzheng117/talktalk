from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.

from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Video
from .forms import VideoForm
from django.contrib.auth.decorators import login_required


@login_required
def video_upload(request):
    if request.method == 'POST':
        form = VideoForm(request.POST, request.FILES)
        if form.is_valid():
            # Handle the form submission (save the video object)
            video = form.save(commit=False)
            video.user = request.user  # Associate the video with the logged-in user
            video.save()
            return redirect('video_success')  # Redirect to a success page
        else:
            # If form is invalid, render the form with errors
            return render(request, 'sample-frontend/upload.html', {'form': form})
    else:
        # Display the form when the page is accessed via GET
        form = VideoForm()
        return render(request, 'sample-frontend/upload.html', {'form': form})


@login_required
def video_success(request):
    return HttpResponse("Video uploaded successfully!")


@login_required
def user_profile(request):
    user = request.user
    print(user)
    return JsonResponse({
        "id": user.id,
        "name": user.get_full_name() or user.username,
        "email": user.email,
    })
