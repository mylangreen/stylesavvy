# Generated by Django 5.0.3 on 2024-06-27 10:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cart', '0021_cartitem_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='total',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
