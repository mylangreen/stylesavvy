from django.shortcuts import render
from .serializers import ProductsSerializer
from .models import Product
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny


# Create your views here.
@api_view(['GET'])
def product_list(request,format=None):
    if request.method == 'GET':
       query = request.query_params.get('search', None)

       if query:
           #Get all the products
           products = Product.objects.filter(name_icontains=query)
       else:   
           #Get all the products
           products = Product.objects.all()
       #Serialize them
       serialized_products = ProductsSerializer(products,many=True)
       #Return Json
       return Response(serialized_products.data)
    
@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request,id,format=None):
    try:
       product = Product.objects.get(id=id)
    except product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serialized_data = ProductsSerializer(product)
        return Response(serialized_data.data)
    
@api_view(['GET'])
def popular_products(request):
    #Get the products
    products = Product.objects.filter(is_popular=True)
    #Serialize them
    serialized_products = ProductsSerializer(products,many=True)
    return Response(serialized_products.data)

@api_view(['GET'])
def trending_products(request):
   
    #Get the products
    products = Product.objects.filter(is_trending=True)
    #Serialize them
    serialized_products = ProductsSerializer(products,many=True)
    return Response(serialized_products.data)
