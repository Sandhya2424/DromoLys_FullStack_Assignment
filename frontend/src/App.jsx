import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Upload from './components/Upload';
import Table from './components/Table';
import Stats from './components/Stats';
import Histogram from './components/Histogram';
import Navbar from './components/Navbar';

function App() {

  const [datasetId, setDatasetId] = useState(null);
  const [columns, setColumns] = useState([]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/upload" element={
          <Upload setDatasetId={setDatasetId} setColumns={setColumns} />
        } />

        <Route path="/table" element={<Table datasetId={datasetId} />} />
        <Route path="/stats" element={<Stats datasetId={datasetId} columns={columns} />} />
        <Route path="/histogram" element={<Histogram datasetId={datasetId} columns={columns} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
