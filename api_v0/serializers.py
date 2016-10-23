from rest_framework import serializers
from articles.models import Client, Trainer, TrainType, Location, Subscription


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            'id',
            'user',
            'name',
            'phone',
            'balance',
            'note',
            'url',
        ]


class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trainer
        fields = [
            'id',
            'user',
            'name',
            'phone',
            'balance',
            'note',
            'url',
        ]


class TrainTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainType
        fields = [
            'id',
            'name',
            'note',
            'url',
        ]


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = [
            'id',
            'name',
            'note',
            'url',
        ]


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = [
            'id',
            'name',
            'visits',
            'validDays',
            'price',
            'note',
            'url',
        ]
