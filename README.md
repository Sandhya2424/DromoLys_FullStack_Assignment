DromoLys Full-Stack Assignment

This project implements a full-stack solution to upload a CSV file, view it as a table, select a column, compute statistics, and visualize histograms. It is designed to meet the functional and computational requirements of the DromoLys take-home assignment.
The solution includes:
Backend: Django REST API for CSV parsing, statistics computation, and histogram data generation
Frontend: React (Vite) application for CSV upload, table view, column selection, statistics display, and histogram plotting

Setup Instructions:

Backend:
  Open terminal and navigate to the backend folder: cd backend
  Run the backend server: python manage.py runserver
  Backend will be available at http://127.0.0.1:8000/

Frontend:
  Open terminal and navigate to the frontend folder: cd frontend
  Install dependencies: npm install
  Start the frontend server: npm run dev
  Frontend will be available at http://localhost:5173/

Functionalities:
  1.Upload a CSV file through the frontend
  2.View CSV data as a table
  3.Select a column to compute statistics (min, max, mean, median, mode)
  4.Display a histogram for numeric columns

API Endpoints:
  POST /api/upload → returns dataset_id and schema summary
  GET /api/dataset/{id}/table → returns table rows
  GET /api/dataset/{id}/column/{col}/stats → returns column statistics
  GET /api/dataset/{id}/column/{col}/hist → returns histogram bins and counts

Notes:
  Only CSV files are supported
  Missing values are ignored in numeric calculations
  Histogram is available only for numeric columns
