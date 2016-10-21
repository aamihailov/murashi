# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-10-20 13:31
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, verbose_name='name')),
                ('phone', models.CharField(max_length=32, verbose_name='phone')),
                ('debt', models.DecimalField(decimal_places=2, max_digits=8)),
                ('note', models.TextField(max_length=4096, verbose_name='note')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['name'],
                'verbose_name': 'client',
                'verbose_name_plural': 'clients',
            },
        ),
    ]