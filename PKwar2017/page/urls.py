from django.conf.urls import url, handler400, handler403, handler404, handler500
from . import views


urlpatterns = [
    url(r'^$', views.to_home),
    url(r'^home/$', views.home),
    url(r'^about/$', views.about),
    url(r'^messages/$', views.messages),
    url(r'^sports/soccer/$', views.soccer),
    url(r'^sports/basketball/$', views.basketball),
    url(r'^sports/baseball/$', views.baseball),
    url(r'^sports/esports/$', views.esports),
    url(r'^sports/quiz/$', views.quiz),
    url(r'^sports/ai/$', views.ai),
    #badminton에서 푸터가 가운데 정렬되어 있음.
    url(r'^sports/badminton/$', views.badminton),
    url(r'^sports/hacking/$', views.hacking),
    #cyber, starcraft 푸터에 사진 없음.
    url(r'^cyber/$', views.cyber),
    url(r'^cyber/starcraft/$', views.starcraft),
    url(r'^map/$', views.map),
    url(r'^supporters/$', views.supporters),
    url(r'^schedule/$', views.schedule),
    #poapper 푸터에 사진 없음.
    url(r'^poapper/$', views.poapper),
]
