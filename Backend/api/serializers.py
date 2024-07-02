from rest_framework import serializers
from .models import Product



class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','name','description','price','image','is_trending','is_popular','added_on','img2', 'img3', 'img4')

