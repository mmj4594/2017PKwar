from django.conf.urls import url, include, handler404
from django.contrib import admin

handler404 = 'page.views.error404'


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^chat/', include('chat.urls')),
    url(r'^', include('page.urls')),
]
