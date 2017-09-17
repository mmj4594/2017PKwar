from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^index/$', views.quiz),
	url(r'^json/$', views.json),
]
