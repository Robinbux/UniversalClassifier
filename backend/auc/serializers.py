from rest_framework import serializers

# myapp/serializers.py

from rest_framework import serializers


class LabelSerializer(serializers.Serializer):
    def update(self, instance, validated_data):
        print('UPDATE')

    def create(self, validated_data):
        print('CREATE')

    labels = serializers.ListField(child=serializers.CharField())
    image = serializers.ImageField()


