from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from schedule.models import Event, Occurrence


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


class Traintype(models.Model):
    owner = models.ForeignKey(User, related_name='own_traintypes')
    name = models.CharField(max_length=128)
    note = models.TextField(max_length=4096, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = _('traintype')
        verbose_name_plural = _('traintypes')


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
    traintype = models.ForeignKey(Traintype, null=True)
    trainer = models.ForeignKey(Trainer, null=True)
    duration = models.IntegerField(default=60)
    note = models.TextField(max_length=4096, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['id']
        verbose_name = _('group')
        verbose_name_plural = _('groups')


class Traintemplate(models.Model):
    owner = models.ForeignKey(User, related_name='own_traintemplates')
    event = models.OneToOneField(Event, related_name='traintemplate')
    group = models.ForeignKey(Group, null=True)
    trainer = models.ForeignKey(Trainer, null=True)
    client = models.ManyToManyField(Client)
    location = models.ForeignKey(Location, null=True)

    def __unicode__(self):
        return self.event.title

    class Meta:
        ordering = ['id']
        verbose_name = _('traintemplate')
        verbose_name_plural = _('traintemplates')


class Train(models.Model):
    occurrence = models.OneToOneField(Occurrence, related_name='train')
    group = models.ForeignKey(Group, null=True)
    trainer = models.ForeignKey(Trainer, null=True)
    client = models.ManyToManyField(Client)
    location = models.ForeignKey(Location, null=True)

    def __unicode__(self):
        return self.occurrence.title

    class Meta:
        ordering = ['id']
        verbose_name = _('train')
        verbose_name_plural = _('trains')
