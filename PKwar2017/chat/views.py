from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound, Http404
from .models import BannedWord, BannedUser


def index(request):
    banned_words = BannedWord.objects.all()
    banned_users = BannedUser.objects.all()
    context = {
    'banned_words': banned_words,
    'banned_users': banned_users,
    }
    return render(request, "chat/index.html", context)


def adminindex(request):

    return render(request, "chat/adminindex.html")


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
