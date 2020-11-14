""" MODELO DE USUARIO """

# Models
from django.contrib.auth.models import AbstractUser

# Django
from django.db import models
# Timestamps
from ventas.models import TimeStamps
from django.contrib.auth.models import AbstractUser

# MODELO DE USUARIO
class Usuario(AbstractUser):
    # Cambia el campo que tiene por defecto para la autenticación
    USERNAME_FIELD = "email"
    # Campo de correo electrónico
    email = models.EmailField(
        'email_address',
        unique=True,
        error_messages={
            'unique': 'Este email ya existe.'
        }
    )
    # Phone number
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    # Campos requeridos
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']