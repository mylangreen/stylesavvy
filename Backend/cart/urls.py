from django.urls import path
from . import views

urlpatterns = [
   path("",views.cartList.as_view(), name='Cart_list'),
   path ('<uuid:id>/', views.cartDetailApiView.as_view(), name='cart_detail'),
   path('<uuid:id>/items/',views.cartItems.as_view(), name='Cart_items'),
   path('items/<int:id>/delete',views.cartItemDetail.as_view(), name='remove_cart_item'),
   path('<uuid:id>/items/add', views.addCartItem.as_view(), name='add_cart_item'),
]
