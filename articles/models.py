from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User


class Client(models.Model):
    owner = models.ForeignKey(User, related_name='own_clients')
    user = models.ForeignKey(User, null=True)
    name = models.CharField(max_length=128)
    phone = models.CharField(max_length=32, blank=True)
    balance = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    note = models.TextField(max_length=4096, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = _('client')
        verbose_name_plural = _('clients')


class Trainer(models.Model):
    owner = models.ForeignKey(User, related_name='own_trainers')
    user = models.ForeignKey(User, null=True)
    name = models.CharField(max_length=128)
    phone = models.CharField(max_length=32, blank=True)
    balance = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    note = models.TextField(max_length=4096, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = _('trainer')
        verbose_name_plural = _('trainers')


class TrainType(models.Model):
    owner = models.ForeignKey(User, related_name='own_train_types')
    name = models.CharField(max_length=128)
    note = models.TextField(max_length=4096, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = _('train type')
        verbose_name_plural = _('train types')


class Location(models.Model):
    owner = models.ForeignKey(User, related_name='own_locations')
    name = models.CharField(max_length=128)
    note = models.TextField(max_length=4096, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = _('location')
        verbose_name_plural = _('locations')


class Subscription(models.Model):
    owner = models.ForeignKey(User, related_name='own_subscriptions')
    name = models.CharField(max_length=128)
    visits = models.IntegerField(default=0)
    validDays = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    note = models.TextField(max_length=4096, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = _('subscription')
        verbose_name_plural = _('subscriptions')


class Group(models.Model):
    owner = models.ForeignKey(User, related_name='own_groups')
    name = models.CharField(max_length=128)
    trainType = models.ForeignKey(TrainType, null=True)
    trainer = models.ForeignKey(Trainer, null=True)
    duration = models.IntegerField(default=60)
    note = models.TextField(max_length=4096, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = _('group')
        verbose_name_plural = _('groups')
