from rest_framework import serializers
from articles.models import *
from schedule.models import *


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


class TraintypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Traintype
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


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = [
            'id',
            'name',
            'traintype',
            'trainer',
            'duration',
            'note',
            'url',
        ]


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'id',
            'start',
            'end',
            'title',
            'description',
            'created_on',
            'updated_on',
            'rule',
            'end_recurring_period',
            'color_event',
            'url',
        ]


class OccurrenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occurrence
        fields = [
            'id',
            'event',
            'title',
            'cancelled',
            'description',
            'start',
            'end',
            'original_start',
            'original_end',
            'created_on',
            'updated_on',
            # 'url',
        ]


class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule
        fields = [
            'id',
            'name',
            'description',
            'frequency',
            'params',
            'url',
        ]
