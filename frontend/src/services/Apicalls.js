import axios from 'axios';



export async function uploadCSV(file) {
  let formData = new FormData();
  formData.append('file', file);
  return await axios.post(`http://127.0.0.1:8000/api/upload/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}


export async function getTable(dataset_id) {
  return await axios.get(`http://127.0.0.1:8000/api/dataset/${dataset_id}/table`);
}


export async function getColumnStats(dataset_id, column) {
  return await axios.get(`http://127.0.0.1:8000/api/dataset/${dataset_id}/column/${column}/stats`);
}


export async function getHistogram(dataset_id, column) {
  return await axios.get(`http://127.0.0.1:8000/api/dataset/${dataset_id}/column/${column}/hist`);
}
