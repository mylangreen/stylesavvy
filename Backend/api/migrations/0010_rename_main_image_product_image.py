# Generated by Django 5.0.3 on 2024-06-09 08:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_productimage_product_other_images'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='main_image',
            new_name='image',
        ),
    ]