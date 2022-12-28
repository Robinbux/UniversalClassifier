from django.contrib import admin
from .models import ImagePrediction


class ImagePredictionAdmin(admin.ModelAdmin):
    list_display = ['title', 'confidence']


# Register your models here.

admin.site.register(ImagePrediction, ImagePredictionAdmin)
