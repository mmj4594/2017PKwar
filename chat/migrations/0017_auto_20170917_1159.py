# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-17 02:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0016_auto_20170917_1153'),
    ]

    operations = [
        migrations.AddField(
            model_name='livematch',
            name='경기명',
            field=models.CharField(default='경기', max_length=20),
        ),
        migrations.AlterField(
            model_name='livematch',
            name='match_name',
            field=models.CharField(default='sports', max_length=20),
        ),
    ]