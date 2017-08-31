from django.db import models

# Create your models here.
class LiveMatch(models.Model):
    Which_match = models.CharField(max_length=20, default="abcd")
    Year = models.IntegerField()
    Month = models.CharField(max_length=4)
    Date = models.IntegerField()
    Day = models.CharField(max_length=4)
    Hour = models.IntegerField()
    Minute = models.IntegerField()
    Second = models.IntegerField()
    P_score = models.IntegerField(default=0)
    K_score = models.IntegerField(default=0)

    def __str__(self):
        return self.Which_match
