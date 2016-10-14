from rest_framework import viewsets
from .serializers import *


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()

    def get_serializer_class(self):
        return ClientSerializer
