# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.encoding import python_2_unicode_compatible
from django.db import models

# Create your models here.

@python_2_unicode_compatible
class Quiz(models.Model):
	quiz_number = models.IntegerField()
	quiz_content = models.CharField(max_length=500)
	quiz_image = models.ImageField(upload_to='images/quiz/', blank=True)
	option1 = models.CharField(max_length=40, blank=True)
	option2 = models.CharField(max_length=40, blank=True)
	option3 = models.CharField(max_length=40, blank=True)
	option4 = models.CharField(max_length=40, blank=True)
	option5 = models.CharField(max_length=40, blank=True)
	option6 = models.CharField(max_length=40, blank=True)
	option7 = models.CharField(max_length=40, blank=True)
	option8 = models.CharField(max_length=40, blank=True)
	option9 = models.CharField(max_length=40, blank=True)
	option10 = models.CharField(max_length=40, blank=True)

	def __str__(self):
		return "Quiz " + unicode(self.quiz_number) + ". " + self.quiz_content

class QuizNow(models.Model):
	quiz_now = models.ForeignKey(Quiz)

	def __str__(self):
		return unicode(self.quiz_now.quiz_number)

class Bingo(models.Model):
	x = models.IntegerField()
	y = models.IntegerField()
	quiz = models.ForeignKey(Quiz)
	passed = models.BooleanField(default=False)
	right = models.BooleanField(default=False)
	is_postech = models.BooleanField(default=True)

	def __str__(self):
		if self.is_postech:
			return "[POSTECH] " + unicode(self.x) + ", " + unicode(self.y) + " = " + unicode(self.quiz.quiz_number)
		else:
			return "[KAIST] " + unicode(self.x) + ", " + unicode(self.y) + " = " + unicode(self.quiz.quiz_number)

class Score(models.Model):
	score = models.IntegerField()
	is_postech = models.BooleanField(default=True)

	def __str__(self):
		if self.is_postech:
			return "POSTECH: " + unicode(self.score)
		else:
			return "KAIST: " + unicode(self.score)

class RightWrong(models.Model):
	is_postech = models.BooleanField(default=True)
	right_wrong = models.CharField(max_length=10)

	def __str__(self):
		if self.is_postech:
			return "POSTECH: " + self.right_wrong
		else:
			return "KAIST: " + self.right_wrong

class Announcement(models.Model):
	is_quiz_start = models.BooleanField(default=True)
	ment = models.CharField(max_length=20)

	def __str__(self):
		if is_quiz_start:
			return "Quiz Start"
		else:
			return self.ment
