# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-16 16:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0014_auto_20170917_0150'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='which_video',
            field=models.TextField(),
        ),
    ]