# Generated by Django 3.1.3 on 2020-11-13 21:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='producto',
            name='estado',
        ),
    ]
