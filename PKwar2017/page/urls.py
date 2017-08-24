from django.conf.urls import url
from . import views

app_name = 'elections'
urlpatterns = [
    url(r'^$', views.to_home),
    url(r'^home/$', views.home),
    url(r'^about/$', views.about),
    url(r'^messages/$', views.messages),
    url(r'^sports/soccer/$', views.soccer),
    url(r'^map/$', views.map),
    url(r'^supporters/$', views.supporters),
]
