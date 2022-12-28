from rest_framework.views import APIView
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
from io import BytesIO
import clip
import torch
import json

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)


class ImagePredictionView(APIView):

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super(ImagePredictionView, self).dispatch(request, *args, **kwargs)

    def post(self, request):
        data_dict = request.POST.dict()
        files_dict = request.FILES
        if 'labels' not in data_dict or 'image' not in files_dict:
            return HttpResponse('Error: Invalid request body')
        labels, image_bytes = json.loads(data_dict['labels']), files_dict['image'].read()
        pil_image = Image.open(BytesIO(image_bytes))

        image = preprocess(pil_image).unsqueeze(0).to(device)
        text = clip.tokenize(labels).to(device)

        with torch.no_grad():
            logits_per_image, logits_per_text = model(image, text)
            probs = logits_per_image.softmax(dim=-1).cpu().numpy()

        # Return a response
        return HttpResponse(json.dumps(probs.tolist()), content_type='application/json')

    @classmethod
    def get_extra_actions(cls):
        return []
