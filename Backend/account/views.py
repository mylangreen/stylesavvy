from django.shortcuts import render
from rest_framework.decorators import api_view
from .serializers import UserRegistrationSerializer, LoginSerializer, TokenSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.conf import settings
from django.contrib.auth import login, authenticate
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import User
from cart.models import Cart
from like.models import Like


#User = settings.AUTH_USER_MODEL

# Create your views here.
class UserRegistrationView(APIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            confirm_password = serializer.validated_data['confirm_password']
            email = serializer.validated_data['email']
            phone_number = serializer.validated_data['phone_number']
            password = serializer.validated_data['password']
            username = serializer.validated_data['username']
            if confirm_password != password:
                return Response({"error":"Passwords do not match"})
            serializer.validated_data.pop('confirm_password')
            user = User.objects.create_user(email=email,phone_number=phone_number,password=password,username=username)
            Cart.objects.create(user=user)
            Like.objects.create(user=user)
            return Response({"message":"Your account has been created successfully"},status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    serializer_class = UserSerializer()
    permission_classes = [AllowAny]
    def get(self,request,id):
        user = get_object_or_404(User, id=id)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)

class LoginUser(APIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user =  authenticate(request, email=email, password=password)
            if user is not None:
               login(request, user)
               return Response({"message": "User logged in succesfully"}, status=status.HTTP_200_OK)
            return Response({"error": "User does not exist"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ObtainAuthTokens(TokenObtainPairView):
    serializer_class = TokenSerializer         