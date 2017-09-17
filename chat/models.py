from django.db import models

# Create your models here.
class BannedWord(models.Model):
    banned_word = models.TextField()
    def __str__(self):
        return self.banned_word

class BannedUser(models.Model):
    banned_user = models.TextField()
    def __str__(self):
        return str(self.banned_user)

class AdminUser(models.Model):
    admin_user = models.TextField()
    def __str__(self):
        return str(self.admin_user)

class Freeze(models.Model):
    is_freeze = models.BooleanField()


class LiveMatch(models.Model):
    match_name = models.CharField(max_length=20, default="sports")
    경기명 = models.CharField(max_length=20, default="경기")
    p_score = models.IntegerField(default=0)
    k_score = models.IntegerField(default = 0)
    which_video = models.TextField()
    def __str__(self):
        return self.match_name

class FinishedMatch(models.Model):
    match_name = models.CharField(max_length=20, default="sports")
    year = models.IntegerField(default=0)
    month = models.CharField(max_length=4, default="Sep")
    date = models.IntegerField(default=0)
    day = models.CharField(max_length=4, default="Mon")
    hour = models.IntegerField(default=0)
    minute = models.IntegerField(default=0)
    second = models.IntegerField(default=0)
    p_score = models.IntegerField(default=0)
    k_score = models.IntegerField(default=0)
    게임명 = models.CharField(max_length=20, default="경기")
    which_video = models.TextField()
    def __str__(self):
        return self.match_name
