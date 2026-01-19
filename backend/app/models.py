from django.db import models

class Dataset(models.Model):
    name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class DataRow(models.Model):
    dataset = models.ForeignKey(Dataset,on_delete=models.CASCADE,related_name='rows')
    data = models.JSONField()

    def __str__(self):
        return f"Row {self.id} of Dataset {self.dataset.id}"

