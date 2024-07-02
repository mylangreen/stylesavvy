from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.FloatField()
    image = models.ImageField(upload_to='images/')
    added_on = models.DateTimeField(auto_now_add=True)
    is_trending = models.BooleanField(default=False)
    is_popular  = models.BooleanField(default=False)
    img2 = models.ImageField(upload_to='images/',null=True)
    img3 = models.ImageField(upload_to='images/',null=True)
    img4 = models.ImageField(upload_to='images/',null=True)

    def __str__(self):
       return self.name