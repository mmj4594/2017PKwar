from django.conf.urls import url
from . import views

app_name = 'elections'
urlpatterns = [
    url(r'^$', views.to_home),
    url(r'^home/$', views.home),
    url(r'^about/$', views.about),
    url(r'^messages/$', views.messages),
    url(r'^sports/$', views.sports),
    url(r'^sports/soccer/$', views.soccer),
    url(r'^sports/basketball/$', views.basketball),
    url(r'^cyber/$', views.cyber),
    url(r'^cyber/starcraft/$', views.starcraft),
    url(r'^map/$', views.map),
    url(r'^supporters/$', views.supporters),
    url(r'^schedule/$', views.schedule),
    url(r'^poapper/$', views.poapper),
]
