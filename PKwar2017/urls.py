from django.conf.urls import url, include, handler404, handler500
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

handler404 = 'page.views.error404'
handler500 = 'page.views.error500'


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^live/', include('chat.urls')),
    url(r'^', include('page.urls')),
    url(r'^quiz/', include('quiz.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
