from rest_framework import serializers
from api.models import Product
from .models import Cart, CartItem

class SimpleProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','name','image','price']

class CartItemSerializer(serializers.ModelSerializer):
    product = SimpleProductSerializer(many=False)
    id = serializers.IntegerField(read_only=True)
    quantity = serializers.IntegerField()
    sub_total = serializers.SerializerMethodField(method_name='total')
    class Meta:
        model = CartItem
        fields = ['id','product','quantity','sub_total']
    def total(self, item:CartItem):
        return item.product.price * item.quantity

class CartSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    user = serializers.EmailField(read_only=True)
    items = CartItemSerializer(many=True)
    total = serializers.SerializerMethodField(method_name='main_total')
    class Meta:
        model = Cart
        fields = ['id','user','items','total']
    def main_total(self,cart:Cart):
        items = cart.items.all()
        total = sum([item.quantity * item.product.price for item in items])
        return total

class AddCartItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(read_only=True)
    class Meta:
        model = CartItem
        fields = ['id','product_id','quantity']

class UpdateCartItemSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    quantity = serializers.IntegerField()
    class Meta:
        model = CartItem
        fields = ['id','quantity']