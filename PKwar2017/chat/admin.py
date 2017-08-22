from django.contrib import admin

from .models import BannedWord, BannedUser

# Register your models here.
admin.site.register(BannedWord)
admin.site.register(BannedUser)
