import json
from django.db import models


class ImagePrediction(models.Model):
    # other fields here
    title = models.CharField(max_length=255)
    confidence = models.FloatField()

