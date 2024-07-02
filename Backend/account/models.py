from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=10, unique=True)
    phone_number = models.CharField(max_length=15, unique=True)
    confirm_password = models.CharField(max_length=10, blank=True,null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','phone_number']

    def _str_(self):
        return self.username