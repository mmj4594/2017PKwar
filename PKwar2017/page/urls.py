from django.conf.urls import url
from . import views

app_name = 'elections'
urlpatterns = [
    url(r'^home/$', views.home),
    url(r'^about/$', views.about),
    url(r'^sports/soccer/$', views.soccer),
]
