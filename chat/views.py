from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound, Http404
from .models import BannedWord, BannedUser, AdminUser, Freeze, LiveMatch, FinishedMatch


def index(request):
    banned_words = BannedWord.objects.all()
    banned_users = BannedUser.objects.all()
    is_freeze = Freeze.objects.all()
    livematch = LiveMatch.objects.all()
    matches = FinishedMatch.objects.all()
    result = Result.objects.all()
    context = {
    'banned_words': banned_words,
    'banned_users': banned_users,
    'is_freeze': is_freeze,
    'livematch': livematch,
    'matches': matches,
    'result': result,
    }
    return render(request, "chat/index.html", context)

def adminindex(request):
    admin_users = AdminUser.objects.all()
    banned_words = BannedWord.objects.all()
    banned_users = BannedUser.objects.all()
    is_freeze = Freeze.objects.all()
    livematch = LiveMatch.objects.all()
    matches = FinishedMatch.objects.all()
    context = {
    'admin_users': admin_users,
    'banned_words': banned_words,
    'banned_users': banned_users,
    'is_freeze': is_freeze,
    'livematch': livematch,
    'matches': matches,
    }
    return render(request, "chat/adminindex.html", context)




def reload_banuser(request):
    banned_users = BannedUser.objects.all()
    context = {
    'banned_users': banned_users,
    }
    return render(request, 'chat/reload_banuser.html', context)

def reload_banword(request):
    banned_words = BannedWord.objects.all()
    context = {
    'banned_words': banned_words,
    }
    return render(request, 'chat/reload_banword.html', context)

def reload_freeze(request):
    is_freeze = Freeze.objects.all()
    context = {
    'is_freeze': is_freeze,
    }
    return render(request, 'chat/reload_freeze.html', context)

def reload_match(request):
    livematch = LiveMatch.objects.all()
    context = {
    'livematch': livematch,
    }
    return render(request, 'chat/reload_match.html', context)
