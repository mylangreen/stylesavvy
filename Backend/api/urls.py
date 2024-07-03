from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('products/',views.product_list),
    path('products/<int:id>/',views.product_detail),
    path('popular/',views.popular_products),
    path('trending/',views.trending_products),
    ]

urlpatterns = format_suffix_patterns(urlpatterns)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)