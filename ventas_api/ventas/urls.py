""" Ventas urls. """

from django.urls import path, include

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Views
from .viewsets import productos as productos_views
from .viewsets import ventas as ventas_views

router = DefaultRouter()
# URL's user.
router.register('productos', productos_views.ProductoViewSet, basename='productos')
router.register('ventas', ventas_views.VentaViewSet, basename='ventas')

urlpatterns = [
    path('', include(router.urls))
]