import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Navbar(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login");
    props.showAlert("Logged Out Successfully", "success")

  }
  let location = useLocation();
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/'?'active': '' }`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          {localStorage.getItem('token') && <Link className={`nav-link ${location.pathname === '/addnote'?'active': '' }`} aria-current="page" to="/addnote">Create a note</Link>}
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === '/about'?'active': '' }`} to="/about">About</Link>
        </li>
        {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> */}
        {/* <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li> */}
      </ul>
        {localStorage.getItem('token') && <Link className='navbar-brand' to='/profile' style={{
              "padding": "0.5em",
              "background-color": "#333333",
              "border-radius": "5px",
        }}><small>{`${localStorage.getItem('email')}`}</small></Link>}
        {!localStorage.getItem('token')? <div className="form-check form-switch">
          <Link className="btn btn-info mx-2" role="button" to='/login'>Login</Link>
          <Link className="btn btn-warning mx-2" role="button" to='/signup'>Sign Up</Link>
        </div>: <button className="btn btn-danger mx-2" onClick={handleLogout}>Log Out</button>}
    </div>
  </div>
</nav>
    </div>
  )
}
