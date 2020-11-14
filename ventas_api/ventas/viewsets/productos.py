""" Producto ViewSet. """

# Django

# Django REST Framework
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Models 
from ventas.models import Producto

# Serializers 
from ventas.serializers.productos import ProductoModelSerializer

# Permissions


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoModelSerializer
    lookup_field = 'id'

    def get_permissions(self):
        # Permitir listar pero no hacer otras acciones
        permissions = []
        if(self.action) in ['create', 'update', 'partial_update', 'destroy']:
            permissions = [IsAuthenticated]
        return [p() for p in permissions]

    @action(detail=False, methods=['get'])
    def tienda(self, request, *args, **kwargs):
        # Serializer
        misProductos = Producto.objects.filter(usuario=self.request.user.id)
        data = {
            'productos': ProductoModelSerializer(misProductos, many=True).data
        }
        # Devolver unicamente mensaje
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def general(self, request, *args, **kwargs):
        # Serializer
        if self.request.user:
            productos = Producto.objects.exclude(usuario=self.request.user.id)
        else:
            productos = Producto.objects.all()
        data = {
            'productos': ProductoModelSerializer(productos, many=True).data
        }
        # Devolver unicamente mensaje
        return Response(data, status=status.HTTP_201_CREATED)


    # Al crear un producto, obtiene el usuario autenticado.
    def perform_create(self, serializer):
        producto = serializer.save(usuario=self.request.user)
