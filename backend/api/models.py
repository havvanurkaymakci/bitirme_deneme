from django.db import models
from django.contrib.auth.models import User
import datetime


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
    

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(null=True, blank=True)
    @property
    def age(self):
        if self.birth_date:
            return (datetime.date.today() - self.birth_date).days // 365
        return None
    height = models.FloatField(null=True, blank=True)  # Boy (cm)
    weight = models.FloatField(null=True, blank=True)  # Kilo (kg)

   

    def __str__(self):
        return f'{self.user.username} Profile'
