# Generated by Django 5.0.3 on 2024-06-23 08:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0008_cart'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartitem',
            name='user',
        ),
    ]
