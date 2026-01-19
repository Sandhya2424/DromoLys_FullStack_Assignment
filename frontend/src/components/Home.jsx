import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container text-center w-50 p-5 mt-3 fst-italic border border-3 shadow">
      <h3>WELCOME TO DROMOLYS CSV APP</h3>
      <Link to="/upload">
        <button className="btn btn-primary mt-3">Upload CSV</button>
      </Link>
    </div>
  );
}

export default Home;
