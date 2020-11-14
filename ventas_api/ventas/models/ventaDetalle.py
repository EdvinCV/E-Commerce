""" MODELO DE VENTA DETALLE """

# Models
from .timestamps import TimeStamps
# Django
from django.db import models
from .producto import Producto
from .venta_encabezado import VentaEncabezado

class VentaDetalle(TimeStamps):
    # Venta Encabezado
    ventaEncabezado = models.ForeignKey(VentaEncabezado, on_delete=models.CASCADE)
    # Producto
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    # Precio
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    # Cantidad
    cantidad = models.IntegerField(default=0)
    # Descuento
    descuento = models.IntegerField(default=0)
    # Subtotal
    subTotal = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Campos requeridos
    REQUIRED_FIELDS = ["ventaEncabezado", "producto", "precio", "cantidad", "descuento", "subTotal"]