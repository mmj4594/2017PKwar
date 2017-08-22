from django.db import models

# Create your models here.
class BannedWord(models.Model):
    banned_word = models.TextField()
    def __str__(self):
        return self.banned_word

class BannedUser(models.Model):
    banned_user = models.IntegerField()
    def __str__(self):
        return str(self.banned_user)
