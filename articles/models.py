from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User


class Client(models.Model):
    user = models.ForeignKey(User, null=True)
    name = models.CharField(_('name'), max_length=128)
    phone = models.CharField(_('phone'), max_length=32, blank=True)
    debt = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    note = models.TextField(_('note'), max_length=4096, blank=True)

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['name']
        verbose_name = _('client')
        verbose_name_plural = _('clients')
