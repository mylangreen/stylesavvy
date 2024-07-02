from django.urls import path
from . import views
from rest_framework_simplejwt.views import  TokenRefreshView

urlpatterns = [
    path('users/',views.UserRegistrationView.as_view()),
    path('users/login/',views.LoginUser.as_view(),name='login'),
    path('users/<int:id>/',views.UserDetailView.as_view(), name='user_detail'),
    path('token/',views.ObtainAuthTokens.as_view(),name='get_token'),
    path('token/refresh',TokenRefreshView.as_view(),name='refresh_token'),
]