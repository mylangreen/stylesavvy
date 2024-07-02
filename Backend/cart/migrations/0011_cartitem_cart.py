# Generated by Django 5.0.3 on 2024-06-23 08:52

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0010_remove_cartitem_product_cartitem_product_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartitem',
            name='cart',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='items', to='cart.cart'),
        ),
    ]