import React, { useEffect, useState } from 'react';
import { getTable } from '../services/Apicalls';

function Table({ datasetId }) {
  const [rows, setRows] = useState([]);


  useEffect(() => {
    const fetchTable = async () => {
      if (!datasetId) return;
      try {
        const res = await getTable(datasetId);
        setRows(res.data);
      } catch (error) {
        console.error("Error fetching table:", error);
      }
    };
    fetchTable();
  }, [datasetId]);

  if (!datasetId) return <p>Please upload a CSV first.</p>;

  return (
    <div className="container mt-3">
      <h3>CSV Table</h3>
      {rows.length === 0 ? (
        <p>Loading table...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              {Object.keys(rows[0].data).map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                {Object.values(row.data).map((val, idx) => (
                  <td key={idx}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
