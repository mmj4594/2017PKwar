# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-16 16:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0011_auto_20170917_0013'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='게임명',
            field=models.CharField(default='경기', max_length=20),
        ),
    ]
