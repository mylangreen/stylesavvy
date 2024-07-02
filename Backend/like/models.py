from django.db import models
import uuid
from django.conf import settings
from api.models import Product

user = settings.AUTH_USER_MODEL

# Create your models here.
class Like(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user= models.OneToOneField(user, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user)

class LikeItem(models.Model):
    like = models.ForeignKey(Like, on_delete=models.CASCADE,related_name='items')
    product = models.ForeignKey(Product,on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.product.name

