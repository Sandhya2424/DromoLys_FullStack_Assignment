import React, { useState } from 'react';
import { getHistogram } from '../services/Apicalls';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Histogram({ datasetId, columns }) {
  const [column, setColumn] = useState('');
  const [bins, setBins] = useState([]);

  const handleHistogram = async () => {
    if (!column || !datasetId) return;
    const res = await getHistogram(datasetId, column);
    setBins(res.data.bins);
  };

  const data = {
    labels: bins.map((b) => `${b.min.toFixed(1)} - ${b.max.toFixed(1)}`),
    datasets: [
      {
        label: column,
        data: bins.map((b) => b.count),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  return (
    <div className="container w-75 mt-3 border p-3 shadow">
      <h3>Histogram</h3>

      {columns && columns.length > 0 ? (
        <select
          className="form-control mb-2"
          value={column}
          onChange={(e) => setColumn(e.target.value)}
        >
          <option value="">Select column</option>
          {columns.map((col) => (
            <option key={col} value={col}>{col}</option>
          ))}
        </select>
      ) : (
        <p>Please upload a CSV first to see columns.</p>
      )}

      <button
        className="btn btn-primary mb-2"
        onClick={handleHistogram}
        disabled={!column}
      >
        Show Histogram
      </button>

      {bins.length > 0 && <Bar data={data} />}
    </div>
  );
}

export default Histogram;
