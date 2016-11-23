from rest_framework import viewsets, permissions
from .serializers import *
from schedule.periods import Period


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


class EventsViewSet(viewsets.ModelViewSet):
    serializer_class = EventSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return self.request.user.creator.all()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class TraintemplatesViewSet(viewsets.ModelViewSet):
    serializer_class = TraintemplateSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get_queryset(self):
        return self.request.user.own_traintemplates.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class OccurrencesViewSet(viewsets.ModelViewSet):
    serializer_class = OccurrenceSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        start = datetime.datetime(2016, 1, 1)
        today = datetime.datetime.now()
        my_events = Calendar.objects.get(pk=1).events.all()
        my_occurrences = Period(my_events, start, today+datetime.timedelta(days=365))
        return my_occurrences.get_occurrences()


class TrainViewSet(viewsets.ModelViewSet):
    serializer_class = TrainSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        start = datetime.datetime(2016, 1, 1)
        today = datetime.datetime.now()
        my_events = Calendar.objects.get(pk=1).events.all()
        my_occurrences = Period(my_events, start, today+datetime.timedelta(days=365))
        trains = []
        for occ in my_occurrences.get_occurrences():
            if occ.id:
                trains.append(occ.train)
            else:
                template = occ.event.traintemplate
                train = Train(occurrence=occ,
                              group=template.group,
                              trainer=template.trainer,
                              location=template.location)
                trains.append(train)
        return trains


class RulesViewSet(viewsets.ModelViewSet):
    serializer_class = RuleSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return Rule.objects.all()
