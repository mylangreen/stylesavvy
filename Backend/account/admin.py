from django.contrib import admin
from account.models import User

class userAdmin(admin.ModelAdmin):
    list_display = ['username','email','phone_number']

# Register your models here.
admin.site.register(User, userAdmin)