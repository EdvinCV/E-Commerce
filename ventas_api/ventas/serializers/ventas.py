""" Curso serializer. """

# Django REST Framework
from rest_framework import serializers

# Model
from ventas.models import VentaEncabezado, VentaDetalle

class VentaEncabezadoModelSerializer(serializers.ModelSerializer):
    #usuario = serializers.SlugRelatedField(read_only=True, slug_field='username')

    class Meta: 
        model = VentaEncabezado
        fields = (
            'id', 'nombreFactura','nit', 'telefono', 'total'
        )

class VentaDetalleModelSerializer(serializers.ModelSerializer):
    #usuario = serializers.SlugRelatedField(read_only=True, slug_field='username')

    class Meta: 
        model = VentaDetalle
        fields = (
            'id', 'cantidad',
            'precio', 'descuento'
        )