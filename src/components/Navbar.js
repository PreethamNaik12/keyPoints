import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {Toggle, User } from '@geist-ui/core'

export default function Navbar(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/authorization");
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
              {localStorage.getItem('token') && <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
              </li>}
              {localStorage.getItem('token') && <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/addnote' ? 'active' : ''}`} aria-current="page" to="/addnote">Create a note</Link>
              </li>}
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
              </li>
            </ul>
            {localStorage.getItem('token') && <User src="https://unix.bio/assets/avatar.png" name="Witt">
              <User.Link href="https://twitter.com/echo_witt">{`${localStorage.getItem('email')}`}</User.Link>
            </User>}
            {!localStorage.getItem('token') ? <div className="form-check form-switch">
              <Link className="btn btn-info mx-2" role="button" to='/authorization'>Login</Link>
              <Link className="btn btn-warning mx-2" role="button" to='/authorization'>Sign Up</Link>
            </div> : <button className="btn btn-danger mx-2" onClick={handleLogout}>Log Out</button>}
            
            <Toggle />

          </div>
        </div>
      </nav>
    </div>
  )
}


