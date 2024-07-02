from django.contrib import admin
from .models import Like, LikeItem

# Register your models here.
admin.site.register(Like)
admin.site.register(LikeItem)