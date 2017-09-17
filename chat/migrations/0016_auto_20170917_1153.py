# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-17 02:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0015_auto_20170917_0157'),
    ]

    operations = [
        migrations.CreateModel(
            name='LiveMatch',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('match_name', models.TextField()),
                ('p_score', models.IntegerField(default=0)),
                ('k_score', models.IntegerField(default=0)),
                ('which_video', models.TextField()),
            ],
        ),
        migrations.RenameModel(
            old_name='Match',
            new_name='FinishedMatch',
        ),
        migrations.DeleteModel(
            name='WhichVideo',
        ),
    ]
