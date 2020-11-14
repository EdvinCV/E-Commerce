""" USER SERIALIZER """

# Django
# Django REST Framework
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate, password_validation
# Models
from usuarios.models import Usuario
from rest_framework.authtoken.models import Token

# Utilities


class UserModelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Usuario
        fields = (
            'username',
            'first_name',
            'last_name',
            'email',
        )

class UserSignupSerializer(serializers.Serializer):
    # Campos para validar.
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=Usuario.objects.all())]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=Usuario.objects.all())]
    )
    password =  serializers.CharField(max_length=24)
    first_name =  serializers.CharField(max_length=24)
    last_name =  serializers.CharField(max_length=24)
        
    def create(self, data):
        # Crear un usuario
        user = Usuario.objects.create_user(**data)
        return user

            
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=64)

    def validate(self, data):
        # Verificar que exista el usuario
        user = authenticate(username=data['email'], password=data['password'])
        # Si no existe usuario envía error.
        if not user: 
            raise serializers.ValidationError('Email o contrasena incorrectos')
        # Almacena el usuario en el contexto.
        self.context['user'] = user
        return data
    
    def create(self, data):
        """ Cuando se crea un usuario se crea un Token. """
        token, created = Token.objects.get_or_create(user=self.context['user'])
        return self.context['user'], token.key