from django.contrib import admin

from .models import BannedWord, BannedUser, AdminUser, Freeze, WhichVideo

# Register your models here.
admin.site.register(BannedWord)
admin.site.register(BannedUser)
admin.site.register(AdminUser)
admin.site.register(Freeze)
admin.site.register(WhichVideo)
