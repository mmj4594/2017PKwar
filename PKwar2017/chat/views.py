from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound, Http404
from .models import BannedWord, BannedUser, AdminUser, Freeze, WhichVideo


def index(request):
    banned_words = BannedWord.objects.all()
    banned_users = BannedUser.objects.all()
    is_freeze = Freeze.objects.all()
    which_video = WhichVideo.objects.all()
    context = {
    'banned_words': banned_words,
    'banned_users': banned_users,
    'is_freeze': is_freeze,
    'which_video': which_video
    }
    return render(request, "chat/index.html", context)

def adminindex(request):
    banned_words = BannedWord.objects.all()
    banned_users = BannedUser.objects.all()
    admin_users = AdminUser.objects.all()
    is_freeze = Freeze.objects.all()
    context = {
    'banned_words': banned_words,
    'banned_users': banned_users,
    'admin_users': admin_users,
    'is_freeze': is_freeze,
    }
    return render(request, "chat/adminindex.html", context)




def reload_banuser(request):
    incremenet = int(request.GET['increment'])
    incremenet_to = incremenet + 10
    banned_users = BannedUser.objects.all()
    context = {
    'banned_users': banned_users,
    }
    return render(request, 'chat/reload_banuser.html', context)

def reload_banword(request):
    incremenet = int(request.GET['increment'])
    incremenet_to = incremenet + 10
    banned_words = BannedWord.objects.all()
    context = {
    'banned_words': banned_words,
    }
    return render(request, 'chat/reload_banword.html', context)

def reload_freeze(request):
    incremenet = int(request.GET['increment'])
    incremenet_to = incremenet + 10
    is_freeze = Freeze.objects.all()
    context = {
    'is_freeze': is_freeze,
    }
    return render(request, 'chat/reload_freeze.html', context)
