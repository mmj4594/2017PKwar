from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseNotFound, Http404
# Create your views here.

def home(request):
    return render(request, "page/home.html")


def about(request):
    return render(request, "page/about.html")


def soccer(request):
    return render(request, "page/sports/soccer.html")
