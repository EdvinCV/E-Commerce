""" MODELO DE VENTA ENCABEZADO """

# Models
from .timestamps import TimeStamps
# Django
from django.db import models

class VentaEncabezado(TimeStamps):
    # Nombre para la factura
    nombreFactura = models.CharField(max_length=50)
    # NIT
    nit = models.CharField(max_length=50)
    # Telefono
    telefono = models.CharField(max_length=50)
    # Total
    total = models.DecimalField(max_digits=10, decimal_places=2)
    # Campos requeridos
    REQUIRED_FIELDS = ["nombreFactura", "nit", "telefono", "total"]