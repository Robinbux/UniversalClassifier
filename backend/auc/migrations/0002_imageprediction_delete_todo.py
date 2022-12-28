# Generated by Django 4.1.4 on 2022-12-27 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auc', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImagePrediction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('confidence', models.FloatField()),
            ],
        ),
        migrations.DeleteModel(
            name='Todo',
        ),
    ]
