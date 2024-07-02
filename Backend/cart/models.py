from django.db import models
from django.conf import settings
import uuid
from api.models import Product

User = settings.AUTH_USER_MODEL

# Create your models here.
class Cart(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    user = models.OneToOneField(User,null=True,blank=True, on_delete=models.CASCADE)
    

    def __str__(self):
        return f"{self.user}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart,related_name="items",on_delete=models.CASCADE, null=True,blank=True)
    product = models.ForeignKey(Product,on_delete=models.CASCADE,null=True,blank=True)
    quantity = models.IntegerField(default=1)



