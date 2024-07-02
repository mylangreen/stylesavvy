from rest_framework import serializers
from .models import Like, LikeItem
from api.models import Product

class LikeSerializer(serializers.ModelSerializer):
    user = serializers.EmailField()
    class Meta:
        model = Like
        fields = ['id','user']

class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','name','image','price']

class LikeItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    product = SimpleProductSerializer(many=False)
    class Meta:
        model = LikeItem
        fields = ['id','product']

class AddLikeItemSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField()
    class Meta:
        model = LikeItem
        fields = ['id','product_id']