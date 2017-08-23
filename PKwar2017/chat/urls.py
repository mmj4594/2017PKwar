from django.conf.urls import url
from . import views

app_name = 'elections'
urlpatterns = [
    url(r'^$', views.index),
    url(r'^admin/$', views.adminindex),
    url(r'^reload_banuser/$', views.reload_banuser),
    url(r'^reload_banword/$', views.reload_banword),
]
