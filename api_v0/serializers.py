from rest_framework import serializers
from articles.models import Client


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            'id',
            'user',
            'name',
            'phone',
            'debt',
            'note',
            'url',
        ]
