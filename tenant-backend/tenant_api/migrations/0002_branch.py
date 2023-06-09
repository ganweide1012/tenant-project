# Generated by Django 4.1.7 on 2023-03-23 04:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tenant_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Branch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tenantId', models.CharField(max_length=250)),
                ('slugName', models.CharField(max_length=250)),
                ('name', models.CharField(max_length=200)),
                ('imageUrl', models.CharField(max_length=1250, null=True)),
                ('email', models.EmailField(db_index=True, max_length=254, unique=True)),
                ('isMainBranch', models.BooleanField(default=False)),
                ('address', models.CharField(max_length=250, null=True)),
                ('state', models.CharField(max_length=250, null=True)),
                ('country', models.CharField(max_length=250, null=True)),
                ('postcode', models.CharField(max_length=250, null=True)),
                ('phone', models.CharField(max_length=250, null=True)),
                ('isActive', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated_at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='deleted_at')),
            ],
        ),
    ]
