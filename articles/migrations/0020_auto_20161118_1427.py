# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-18 07:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0019_auto_20161118_1427'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='traintype',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='articles.Traintype'),
        ),
    ]
