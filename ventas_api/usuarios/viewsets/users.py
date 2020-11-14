# Models
# Django Rest Framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
# Permissions
from rest_framework.permissions import IsAuthenticated
# Serializers
from usuarios.serializers.users import (
    UserModelSerializer,
    UserSignupSerializer,
    UserLoginSerializer
)


class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserModelSerializer

    @action(detail=False, methods=['get'])
    def me(self, request, *args, **kwargs):
        user = UserModelSerializer(self.request.user).data;
        data = {
            'user': user
        }
        # Devolver unicamente mensaje
        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def signup(self, request, *args, **kwargs):
        # Serializer
        serializer = UserSignupSerializer(data=request.data)
        # Validar request
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # Devolver unicamente mensaje
        return Response("Usuario creado correctamente", status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def login(self, request, *args, **kwargs):
        # Serializer
        serializer = UserLoginSerializer(data=request.data)
        # Validar request
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserModelSerializer(user).data,
            'access_token': token
        }
        # Regresar el token y el usuario
        return Response(data, status=status.HTTP_200_OK)