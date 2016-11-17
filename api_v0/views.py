from rest_framework import viewsets, permissions
from .serializers import *


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class ClientViewSet(viewsets.ModelViewSet):
    serializer_class = ClientSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return self.request.user.own_clients.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TrainerViewSet(viewsets.ModelViewSet):
    serializer_class = TrainerSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return self.request.user.own_trainers.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class TraintypeViewSet(viewsets.ModelViewSet):
    serializer_class = TraintypeSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return self.request.user.own_traintypes.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return self.request.user.own_locations.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class SubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return self.request.user.own_subscriptions.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class GroupsViewSet(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return self.request.user.own_groups.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
