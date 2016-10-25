from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import *


router = DefaultRouter()
router.register(r'clients', ClientViewSet, base_name='client')
router.register(r'trainers', TrainerViewSet, base_name='trainer')
router.register(r'train-types', TrainTypeViewSet, base_name='train_type')
router.register(r'locations', LocationViewSet, base_name='location')
router.register(r'subscriptions', SubscriptionViewSet, base_name='subscription')
router.register(r'groups', GroupsViewSet, base_name='group')


urlpatterns = router.urls
urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', obtain_auth_token)
]
