from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()
router.register(r'clients', ClientViewSet)
router.register(r'trainers', TrainerViewSet)
router.register(r'train-types', TrainTypeViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'subscriptions', SubscriptionViewSet)


urlpatterns = router.urls
