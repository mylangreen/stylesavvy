from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from cart.models import Cart
from like.models import Like

class UserSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    class Meta:
        model = User
        fields = ['id','email','username','phone_number']

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email','phone_number','password','confirm_password','username']
        extra_kwargs = {'password':{'write_only': True}}

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ['email', 'password']

class TokenSerializer(TokenObtainPairSerializer):
    cart_uuid = serializers.SerializerMethodField(method_name='get_cart_uuid')
    like_uuid = serializers.SerializerMethodField(method_name='get_like_uuid')
    profile_id = serializers.SerializerMethodField(method_name='get_user_id')

    def get_cart_uuid(self, user):
        cart = Cart.objects.filter(user=user).first()
        if cart:
            return str(cart.id)
        return None
    
    def get_like_uuid(self, user):
        like = Like.objects.filter(user=user).first()
        if like:
            return str(like.id)
        return None
    
    def get_user_id(self, user):
        email = user.email
        profile = User.objects.filter(email=email).first()
        if profile:
            return str(profile.id)
        return None
    
    def validate(self, attrs):
        data = super().validate(attrs)
        data['cart_uuid'] = self.get_cart_uuid(self.user)
        data['like_uuid'] = self.get_like_uuid(self.user)
        data['profile_id'] = self.get_user_id(self.user)
        return data       
        
        