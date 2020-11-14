""" Django Models Utilities. """

# Django
from django.db import models


class TimeStamps(models.Model):

    created = models.DateTimeField(
        'created_at',
        auto_now_add=True,
        help_text = 'Fecha de creacion'
    )
    updated = models.DateTimeField(
        'updated at',
        auto_now=True,
        help_text = 'Fecha de modificacion'
    )

    class Meta: 
        abstract = True
        get_latest_by = 'created'
        ordering = ['-created', '-updated']




