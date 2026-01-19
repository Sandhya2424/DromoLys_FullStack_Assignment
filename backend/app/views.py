from django.shortcuts import render

# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from app.models import Dataset, DataRow
import csv
import io


class UploadCSVAPIView(APIView):
    def post(self, request):
        file = request.FILES.get('file')

        if not file:
            return Response({"error": "No file uploaded"},status=status.HTTP_400_BAD_REQUEST)

        if not file.name.endswith('.csv'):
            return Response({"error": "Only CSV files allowed"},status=status.HTTP_400_BAD_REQUEST)

        content = file.read().decode('utf-8')
        reader = csv.DictReader(io.StringIO(content))
        rows = list(reader)

        if not rows:
            return Response({"error": "Empty CSV file"},status=status.HTTP_400_BAD_REQUEST)

        columns = {}
        for col in rows[0].keys():
            is_numeric = True
            for row in rows:
                val = row[col]
                if val == "" or val is None:
                    continue
                try:
                    float(val)
                except:
                    is_numeric = False
                    break
            columns[col] = "number" if is_numeric else "string"

        dataset = Dataset.objects.create(name=file.name)

        for row in rows:
            DataRow.objects.create(dataset=dataset, data=row)

        return Response({"dataset_id": dataset.id,"columns": columns,"total_rows": len(rows) }, status=status.HTTP_200_OK)




from app.serializers import DataRowSerializer

class DatasetTableAPIView(APIView):
    def get(self, request, i):
        try:
            dataset = Dataset.objects.get(id=i)
        except Dataset.DoesNotExist:
            return Response({"error": "Dataset not found"},status=status.HTTP_404_NOT_FOUND)

        rows = dataset.rows.all()
        serializer = DataRowSerializer(rows, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




import statistics

class ColumnStatsAPIView(APIView):
    def get(self, request, i, col):
        try:
            dataset = Dataset.objects.get(id=i)
        except Dataset.DoesNotExist:
            return Response({"error": "Dataset not found"}, status=status.HTTP_404_NOT_FOUND)

        values = []
        missing_count = 0

        for row in dataset.rows.all():
            val = row.data.get(col)
            if val == "" or val is None:
                missing_count += 1
                continue
            values.append(val)

        if not values:
            return Response({"error": f"No valid data for column '{col}'"},status=status.HTTP_400_BAD_REQUEST)


        is_numeric = True
        numeric_values = []
        for v in values:
            try:
                numeric_values.append(float(v))
            except:
                is_numeric = False
                break

        stats = {"missing": missing_count}

        if is_numeric:
            stats.update({
                "min": min(numeric_values),
                "max": max(numeric_values),
                "mean": round(sum(numeric_values)/len(numeric_values), 2),
                "median": statistics.median(numeric_values),
                "mode": statistics.mode(numeric_values)
            })
        else:
            freq = {}
            for v in values:
                freq[v] = freq.get(v, 0) + 1
            max_freq = max(freq.values())
            modes = [k for k, v in freq.items() if v == max_freq]
            stats["mode"] = modes[0]
            stats["note"] = "Column is not numeric. Min/Max/Mean/Median not applicable."

        return Response(stats, status=status.HTTP_200_OK)



import numpy as np

class ColumnHistAPIView(APIView):
    def get(self, request, i, col):
        try:
            dataset = Dataset.objects.get(id=i)
        except Dataset.DoesNotExist:
            return Response({"error": "Dataset not found"}, status=status.HTTP_404_NOT_FOUND)


        values = []
        for row in dataset.rows.all():
            val = row.data.get(col)
            try:
                values.append(float(val))
            except:
                continue

        if not values:
            return Response(
                {"error": f"No valid numeric data for column '{col}'"},
                status=status.HTTP_400_BAD_REQUEST
            )

        counts, bin_edges = np.histogram(values, bins=30)

        bins = [{"min": float(bin_edges[j]), "max": float(bin_edges[j+1]), "count": int(counts[j])}
                for j in range(len(counts))]

        return Response({"bins": bins}, status=status.HTTP_200_OK)


