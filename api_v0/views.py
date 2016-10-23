from rest_framework import viewsets
from .serializers import *


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()

    def get_serializer_class(self):
        return ClientSerializer


class TrainerViewSet(viewsets.ModelViewSet):
    queryset = Trainer.objects.all()

    def get_serializer_class(self):
        return TrainerSerializer


class TrainTypeViewSet(viewsets.ModelViewSet):
    queryset = TrainType.objects.all()

    def get_serializer_class(self):
        return TrainTypeSerializer


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()

    def get_serializer_class(self):
        return LocationSerializer


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()

    def get_serializer_class(self):
        return SubscriptionSerializer

