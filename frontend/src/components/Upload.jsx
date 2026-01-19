import React, { useState } from 'react';
import { uploadCSV } from '../services/Apicalls';
import { useNavigate } from 'react-router-dom';

function Upload({ setDatasetId, setColumns }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return setMessage('Please select a CSV file.');
    try {
      const res = await uploadCSV(file);
      console.log(res.data);
      setMessage('Upload successful!');

      // Update App state
      if (setDatasetId) setDatasetId(res.data.dataset_id);
      if (setColumns) setColumns(Object.keys(res.data.columns || {}));

      // Navigate to Table page
      navigate('/table');
    } catch (err) {
      console.error(err);
      setMessage('Upload failed. Make sure it is a valid CSV.');
    }
  };

  return (
    <div className="container w-50 p-5 mt-3 border shadow">
      <h3 className="mb-3">Upload CSV File</h3>
      <input
        type="file"
        accept=".csv"
        className="form-control mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="btn btn-success" onClick={handleUpload}>Upload</button>
      {message && <p className="mt-3 fst-italic">{message}</p>}
    </div>
  );
}

export default Upload;
