from rest_framework.response import Response
from .models import CartItem, Cart
from .serializers import CartItemSerializer, CartSerializer, AddCartItemSerializer, UpdateCartItemSerializer
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework import status
from api.models import Product
from rest_framework.permissions import IsAuthenticated

class cartList(APIView):
    def get(self, request):
        cart = Cart.objects.all()
        serializer = CartSerializer(cart, many=True)
        return Response(serializer.data)
class cartDetailApiView(APIView):
    def get(self, request, id):
        cart = get_object_or_404(Cart,id=id)
        serializer= CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)
class cartItems(APIView):
    def get(self, request, id):
        cart = get_object_or_404(Cart,id=id)
        items = cart.items
        serializer = CartItemSerializer(items, many=True)
        return Response(serializer.data)
class cartItemDetail(APIView):
    serializer_class = UpdateCartItemSerializer
    def get(self, request, id):
        item = get_object_or_404(CartItem, id=id) 
        serializer = CartItemSerializer(item, many=False)
        return Response(serializer.data)
    def delete(self, request, id):
        item = get_object_or_404(CartItem, id=id)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    def put(self, request, id):
        item = get_object_or_404(CartItem, id=id)
        new_quantity = int(request.data.get('quantity',0))
        initial_quantity = item.quantity
        item.quantity = initial_quantity + new_quantity
        if item.quantity > 0:
            item.save()           
        serializer = UpdateCartItemSerializer(item)
        return Response(serializer.data)
class addCartItem(APIView):
    serializer_class = AddCartItemSerializer
    def post(self, request, id):
        cart = get_object_or_404(Cart,id=id)
        serializer = AddCartItemSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            product = get_object_or_404(Product,id=product_id)
            cart_item, created = CartItem.objects.get_or_create(cart=cart,product=product)
            if not created:
                cart_item.save()
            return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

