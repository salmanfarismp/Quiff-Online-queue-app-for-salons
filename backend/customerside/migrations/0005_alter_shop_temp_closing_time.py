# Generated by Django 4.0.4 on 2022-07-03 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customerside', '0004_alter_shop_next_slot_alter_shop_people_in_queue'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='temp_closing_time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
