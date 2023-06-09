# Generated by Django 4.1.7 on 2023-05-08 06:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tenant_api', '0008_alter_surveyeditor_labelname'),
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=250, unique=True)),
                ('labelName', models.CharField(max_length=250)),
                ('labelType', models.CharField(max_length=200)),
                ('labelSection', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created_at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated_at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='deleted_at')),
            ],
        ),
    ]
