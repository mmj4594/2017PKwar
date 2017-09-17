# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import JsonResponse
from .models import Quiz, QuizNow, Bingo, Score, RightWrong, Announcement
from django.shortcuts import render

# Create your views here.
def quiz(request):
	return render(request, "quiz/quiz.html")

def announce(request):
	announcements = Announcement.objects.all()
	
	if (b

def json(request):
	bingos = Bingo.objects.all()

	postech = [[0]*5 for i in range(5)]
	kaist = [[0]*5 for i in range(5)]

	for bingo in bingos:
		if bingo.is_postech:
			postech[bingo.x - 1][bingo.y - 1] = {'num': bingo.quiz.quiz_number, 'passed': bingo.passed, 'right': bingo.right}
		else:
			kaist[bingo.x - 1][bingo.y - 1] = {'num': bingo.quiz.quiz_number, 'passed': bingo.passed, 'right': bingo.right}
	
	scores = Score.objects.all()

	for score in scores:
		if score.is_postech:
			postechscore = score.score
		else:
			kaistscore = score.score

	rightwrongs = RightWrong.objects.all()

	for rightwrong in rightwrongs:
		if rightwrong.is_postech:
			postechrw = rightwrong.right_wrong
		else:
			kaistrw = rightwrong.right_wrong

	quiznow = QuizNow.objects.all()[0]
	qn = {}
	qn["num"] = quiznow.quiz_now.quiz_number
	qn["content"] = quiznow.quiz_now.quiz_content

	
	return JsonResponse({'quiznow': qn, 'postech_bingo': postech, 'kaist_bingo': kaist, 'postechscore': postechscore, 'kaistscore': kaistscore, 'postechrw': postechrw, 'kaistrw': kaistrw, })
