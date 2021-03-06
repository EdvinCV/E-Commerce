# Generated by Django 3.1.3 on 2020-11-14 18:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ventas', '0005_auto_20201114_1819'),
    ]

    operations = [
        migrations.CreateModel(
            name='VentaEncabezado',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Fecha de creacion', verbose_name='created_at')),
                ('updated', models.DateTimeField(auto_now=True, help_text='Fecha de modificacion', verbose_name='updated at')),
                ('nombreFactura', models.CharField(max_length=50)),
                ('nit', models.CharField(max_length=50)),
                ('telefono', models.CharField(max_length=50)),
                ('total', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'ordering': ['-created', '-updated'],
                'get_latest_by': 'created',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='VentaDetalle',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Fecha de creacion', verbose_name='created_at')),
                ('updated', models.DateTimeField(auto_now=True, help_text='Fecha de modificacion', verbose_name='updated at')),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('cantidad', models.IntegerField(default=0)),
                ('descuento', models.IntegerField(default=0)),
                ('subTotal', models.DecimalField(decimal_places=2, max_digits=10)),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.producto')),
                ('ventaEncabezado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.ventaencabezado')),
            ],
            options={
                'ordering': ['-created', '-updated'],
                'get_latest_by': 'created',
                'abstract': False,
            },
        ),
    ]
