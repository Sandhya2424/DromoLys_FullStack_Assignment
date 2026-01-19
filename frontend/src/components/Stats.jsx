import React, { useEffect, useState } from 'react';
import { getTable, getColumnStats } from '../services/Apicalls';

function Stats({ datasetId }) {
  const [stats, setStats] = useState(null);
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('');


  useEffect(() => {
    const fetchColumns = async () => {
      if (!datasetId) return;
      const res = await getTable(datasetId);
      if (res.data.length > 0) {
        setColumns(Object.keys(res.data[0].data)); 
        setSelectedColumn(Object.keys(res.data[0].data)[0]); 
      }
    };
    fetchColumns();
  }, [datasetId]);

  const handleStats = async () => {
    if (!selectedColumn) return;
    const res = await getColumnStats(datasetId, selectedColumn);
    setStats(res.data);
  };

  if (!datasetId) return <p className="container mt-3">Please upload a CSV first.</p>;

  return (
    <div className="container w-50 mt-3 border p-3 shadow">
      <h3>Column Statistics</h3>

      <select
        className="form-select mb-2"
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
      >
        {columns.map((col) => (
          <option key={col} value={col}>{col}</option>
        ))}
      </select>

      <button className="btn btn-primary mb-2" onClick={handleStats}>Get Stats</button>

      {stats && (
        <div className="fst-italic">
          {Object.entries(stats).map(([key, val]) => (
            <p key={key}>{key}: {val}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Stats;
