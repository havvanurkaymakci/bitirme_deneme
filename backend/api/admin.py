from django.contrib import admin
from .models import UserProfile

class UserProfileAdmin(admin.ModelAdmin):
    list_display = ( 'user','birth_date', 'age', 'height', 'weight')

admin.site.register(UserProfile, UserProfileAdmin)

