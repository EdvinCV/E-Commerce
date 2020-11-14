""" MODELO DE PRODUCTO """

# Models
from .timestamps import TimeStamps
# Django
from django.db import models

class Producto(TimeStamps):
    # Usuario/Tienda dueña del producto
    usuario = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE)
    # Nombre del producto
    nombre = models.CharField(max_length=50)
    # Descripcion del producto
    descripcion = models.CharField(max_length=200)
    # Precio del producto
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    # Descuento si el usuario desea aplicar uno
    descuento = models.IntegerField(default=0)
    # Estado del producto
    estado = models.BooleanField(default=True)
    # Campos requeridos
    REQUIRED_FIELDS = ["usuario", "nombre", "descripcion", "precio", "descuento"]
