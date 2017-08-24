from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound, Http404
# Create your views here.

def to_home(request):
    return redirect('/home/')


def home(request):
    return render(request, "page/home.html")


def about(request):
    return render(request, "page/about.html")


def messages(request):
    return render(request, "page/messages.html")


def soccer(request):
    return render(request, "page/sports/soccer.html")


def map(request):
    return render(request, "page/map.html")


def supporters(request):
    return render(request, "page/supporters.html")
