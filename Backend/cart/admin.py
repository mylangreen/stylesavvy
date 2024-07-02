from django.contrib import admin
from .models import Cart, CartItem

class cartAdmin(admin.ModelAdmin):
    list_display = ['id','user']

class cartItemAdmin(admin.ModelAdmin):
    list_display = ['product']

admin.site.register(Cart,cartAdmin)
admin.site.register(CartItem, cartItemAdmin)