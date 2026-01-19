import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand fs-3 fst-italic">DromoLys</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fs-5 fst-italic">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/upload" className="nav-link">Upload CSV</Link>
            </li>
            <li className="nav-item">
              <Link to="/table" className="nav-link">Table</Link>
            </li>
            <li className="nav-item">
              <Link to="/stats" className="nav-link">Stats</Link>
            </li>
            <li className="nav-item">
              <Link to="/histogram" className="nav-link">Histogram</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
