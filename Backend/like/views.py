from django.shortcuts import render
from .serializers import LikeSerializer, LikeItemSerializer, AddLikeItemSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Like, LikeItem
from django.shortcuts import get_object_or_404
from api.models import Product
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class LikeListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        likes = Like.objects.all()
        serializer = LikeSerializer(likes, many=True)
        return Response(serializer.data)

class LikeItemListView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        like = get_object_or_404(Like, id=id)
        items = like.items
        serializer = LikeItemSerializer(items, many=True)
        return Response(serializer.data)

class LikeItemDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        item = get_object_or_404(LikeItem, id=id)
        serializer = LikeItemSerializer(item, many=False)
        return Response(serializer.data)
    def delete(self, request, id):
        item = get_object_or_404(LikeItem,id=id)
        item.delete()  
        return Response(status=status.HTTP_204_NO_CONTENT)  

class AddLikeItemView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = AddLikeItemSerializer
    def post(self, request, id):
        like = get_object_or_404(Like, id=id)
        serializer = AddLikeItemSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            product = get_object_or_404(Product, id=product_id)
            like_item, created = LikeItem.objects.get_or_create(like=like,product=product)
            if not created:
                like_item.save()
            return Response(LikeItemSerializer(like_item).data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)