# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-27 13:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_auto_20170824_1729'),
    ]

    operations = [
        migrations.CreateModel(
            name='Freeze',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_freeze', models.BooleanField()),
            ],
        ),
    ]
