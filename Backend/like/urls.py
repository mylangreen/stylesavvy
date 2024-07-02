from django.urls import path
from . import views

urlpatterns = [
    path('',views.LikeListView.as_view(), name='like_list'),
    path('<uuid:id>/items/', views.LikeItemListView.as_view(), name='like_item_list'),
    path('items/<int:id>/', views.LikeItemDetailView.as_view(), name='like_item_detail'), 
    path('<uuid:id>/items/add/', views.AddLikeItemView.as_view(), name='add_like_item')
]
