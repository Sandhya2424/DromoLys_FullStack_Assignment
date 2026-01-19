import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { getHistogram } from "../services/Apicalls";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Histogram({ datasetId, columns }) {
  const [selectedColumn, setSelectedColumn] = useState("");
  const [histogramData, setHistogramData] = useState([]);

  const loadHistogram = async () => {
    if (!selectedColumn) return;

    try {
      const response = await getHistogram(datasetId, selectedColumn);
      setHistogramData(response.data.bins);
    } catch (error) {
      console.error("Error loading histogram:", error);
    }
  };

  const chartData = {
    labels: histogramData.map(
      (bin) => `${bin.min.toFixed(1)} - ${bin.max.toFixed(1)}`
    ),
    datasets: [
      {
        label: selectedColumn,
        data: histogramData.map((bin) => bin.count),
      },
    ],
  };

  return (
    <div className="container w-75 mt-3 border p-3 shadow">
      <h4>Histogram</h4>

      {columns?.length > 0 ? (
        <>
          <select
            className="form-control mb-2"
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            <option value="">Select column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>

          <button
            className="btn btn-primary mb-2"
            onClick={loadHistogram}
            disabled={!selectedColumn}
          >
            Generate
          </button>
        </>
      ) : (
        <p>Please upload a CSV file first.</p>
      )}

      {histogramData.length > 0 && <Bar data={chartData} />}
    </div>
  );
}

export default Histogram;
