# Generated by Django 4.0.3 on 2023-06-07 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0005_alter_customer_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salesperson',
            name='employee_id',
            field=models.CharField(max_length=100),
        ),
    ]
