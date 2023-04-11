# Generated by Django 4.1.7 on 2023-03-28 08:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tenant_api', '0004_alter_branch_slugname'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slugName', models.CharField(max_length=250, unique=True)),
                ('name', models.CharField(max_length=200)),
                ('email', models.EmailField(db_index=True, max_length=254, unique=True)),
                ('phone', models.CharField(max_length=250, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Participation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=250, unique=True)),
                ('customer', models.CharField(max_length=200)),
                ('program', models.CharField(max_length=200)),
                ('price', models.IntegerField()),
                ('participationDate', models.DateField()),
                ('startDate', models.DateField()),
                ('programDuration', models.IntegerField()),
                ('endDate', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated_at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='deleted_at')),
            ],
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slugProgramName', models.CharField(max_length=250, unique=True)),
                ('program', models.CharField(max_length=200)),
                ('price', models.IntegerField()),
                ('startDate', models.DateField()),
                ('programDuration', models.IntegerField()),
                ('endDate', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated_at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='deleted_at')),
            ],
        ),
    ]