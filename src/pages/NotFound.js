import React from 'react';
import logo from "../assets/logo.svg";

const NotFound = () => {
  return (
    <>
        <div className="container not-found">
            <div className="brand-logo brand">
                <img src={logo} alt="logo" className="logo" style={{ height: "5rem" }}/>
            </div>
            <div className="error-text">
                <h1>Page not found</h1>

                <button className=''>home</button>
            </div>
        </div>
    </>
  )
}

export default NotFound