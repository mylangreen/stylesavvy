# Generated by Django 5.0.3 on 2024-06-27 10:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0017_cart_total'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartitem',
            name='quantity',
            field=models.IntegerField(),
        ),
    ]