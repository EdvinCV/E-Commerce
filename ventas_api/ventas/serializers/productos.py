""" Curso serializer. """

# Django REST Framework
from rest_framework import serializers

# Model
from ventas.models import Producto

class ProductoModelSerializer(serializers.ModelSerializer):
    usuario = serializers.SlugRelatedField(read_only=True, slug_field='username')

    class Meta: 
        model = Producto
        fields = (
            'id', 'usuario','nombre', 'descripcion',
            'precio', 'descuento'
        )