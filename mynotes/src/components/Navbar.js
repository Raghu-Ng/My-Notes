import React from 'react'
// import { useEffect } from 'react';
import { Link, useLocation, useNavigate} from "react-router-dom";

export default function Navbar() {
  // // to Know the present location in the webpage to highlight the page we are in 
  let location = useLocation();
  // useEffect(() => {
    // }, [location]);
  const navigate = useNavigate()
  const handellogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            My Notes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={ `nav-link ${location.pathname === "/"? "active": "" }`}aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={ `nav-link ${location.pathname === "/about"? "active": "" }`} aria-current="page" to="/about">
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ?
              <div>
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/Signup" role="button">Signup</Link> 
              </div>
                :<Link className="btn btn-primary" to="/login" onClick={handellogout} role="button">Log out</Link>}
                
              {/* <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-primary mx-1" to="/Signup" role="button">Signup</Link> */}
          </div>
        </div>
      </nav>

    </>
  )
}
