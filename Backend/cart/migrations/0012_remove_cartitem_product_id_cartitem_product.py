# Generated by Django 5.0.3 on 2024-06-24 07:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_delete_customuser'),
        ('cart', '0011_cartitem_cart'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartitem',
            name='product_id',
        ),
        migrations.AddField(
            model_name='cartitem',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.product'),
        ),
    ]
