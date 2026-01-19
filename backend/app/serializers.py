from rest_framework import serializers
from app.models import Dataset, DataRow

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = '__all__'

class DataRowSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataRow
        fields = '__all__'
