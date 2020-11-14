""" Ventas ViewSet. """

# Django
from django.db.models  import Sum, Count, Avg;
from django.core import serializers as s
# Django REST Framework
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Models
from ventas.models import VentaDetalle, VentaEncabezado
from ventas.models import Producto
# Serializers
from ventas.serializers.ventas import VentaDetalleModelSerializer, VentaEncabezadoModelSerializer
# Permissions


class VentaViewSet(viewsets.ModelViewSet):
    queryset = VentaEncabezado.objects.all()
    serializer_class = VentaDetalleModelSerializer
    lookup_field = 'id'

    @action(detail=False, methods=['post'])
    def realizarCompra(self, request, *args, **kwargs):
        serializer = VentaEncabezadoModelSerializer(data=request.data['ventaEncabezado'])
        # Crear venta encabezado
        serializer.is_valid(raise_exception=True)
        ventaEncabezado = serializer.save()
        # Iterar sobre productos comprados
        for producto in request.data['productos']:
            print(producto)
            # Crear VentaDetalle por cada producto
            serializerVentaDetalle = VentaDetalleModelSerializer(data=producto)
            serializerVentaDetalle.is_valid(raise_exception=True)
            # Instancia de producto
            productoEncontrado = Producto.objects.get(pk=producto['id'])
            serializerVentaDetalle.save(ventaEncabezado=ventaEncabezado, subTotal=producto['total'], producto=productoEncontrado)
        # Retornar respuesta
        return Response("Venta generada correctamente", status=status.HTTP_201_CREATED)


    # REPORTES
    @action(detail=False, methods=['get'])
    def ventasPorProducto(self, request, *args, **kwargs):
        # Query
        ventas = VentaDetalle.objects.filter(producto__usuario=self.request.user.id).values('producto__nombre').order_by('producto__nombre').annotate(total_ventas=Sum('subTotal'))
        # Devolver data
        return Response(ventas, status=status.HTTP_201_CREATED)


    @action(detail=False, methods=['get'])
    def ventasTotal(self, request, *args, **kwargs):
        # Query
        ventas = VentaDetalle.objects.filter(producto__usuario=self.request.user.id).values('producto__nombre').aggregate(Sum('subTotal'))
        # Devolver data
        return Response(ventas, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'])
    def promedioProductos(self, request, *args, **kwargs):
        # Query
        promedio = Producto.objects.filter(usuario=self.request.user.id).aggregate(Avg('precio'))
        # Devolver data
        return Response(promedio, status=status.HTTP_201_CREATED)