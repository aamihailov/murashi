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

    def create(self, validated_data):
        instance = Event.objects.create(**validated_data)
        Traintemplate.objects.create(owner=self.context['request'].user, event=instance)
        return instance


class TraintemplateSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = Traintemplate
        fields = [
            'id',
            'event',
            'group',
            'trainer',
            'location',
            'url',
        ]

    def create(self, validated_data):
        event_data = validated_data.pop('event')
        event = Event.objects.create(**event_data)
        train_template = Traintemplate.objects.create(event=event, **validated_data)
        return train_template

    def update(self, instance, validated_data):
        event_data = validated_data.pop('event')
        event = instance.event

        event.start = event_data.get('start', event.start)
        event.end = event_data.get('end', event.start)
        event.title = event_data.get('title', event.start)
        event.description = event_data.get('description', event.start)
        event.rule = event_data.get('rule', event.start)
        event.end_recurring_period = event_data.get('end_recurring_period', event.start)
        event.color_event = event_data.get('color_event', event.start)
        event.save()

        instance.group = validated_data.get('group', instance.group)
        instance.trainer = validated_data.get('trainer', instance.group)
        instance.location = validated_data.get('location', instance.group)
        instance.save()
        return instance


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


class TrainSerializer(serializers.ModelSerializer):
    occurrence = OccurrenceSerializer()

    class Meta:
        model = Train
        fields = [
            'id',
            'occurrence',
            'group',
            'trainer',
            'location',
            # 'url',
        ]

    def update(self, instance, validated_data):
        occurrence_data = validated_data.pop('occurrence')
        occurrence = instance.occurrence

        occurrence.start = occurrence_data.get('start', occurrence.start)
        occurrence.end = occurrence_data.get('end', occurrence.start)
        occurrence.title = occurrence_data.get('title', occurrence.start)
        occurrence.description = occurrence_data.get('description', occurrence.start)
        occurrence.rule = occurrence_data.get('rule', occurrence.start)
        occurrence.end_recurring_period = occurrence_data.get('end_recurring_period', occurrence.start)
        occurrence.color_event = occurrence_data.get('color_event', occurrence.start)
        occurrence.save()

        instance.group = validated_data.get('group', instance.group)
        instance.trainer = validated_data.get('trainer', instance.group)
        instance.client = validated_data.get('client', instance.group)
        instance.location = validated_data.get('location', instance.group)
        instance.save()
        return instance


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
