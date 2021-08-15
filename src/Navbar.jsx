import React from 'react';
import { NavLink } from 'react-router-dom';
import {AuthContext} from "./context/auth";
import { useContext } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import logo from "../src/images/logofinal.png"

const Navbar =() => {
  const auth = useContext(AuthContext);
  const history = useHistory();
    function logoutRedirect(){
        localStorage.clear("user")
        auth.logout()
        history.push('/refresh')
    }

    return (
        <>
        <div className="nav_bg">
            <div className="row">
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                        <div className="container-fluid">
                            <NavLink className="navbar-brand"  to="/">
                              <h1 className="brand">Break Time</h1>
                            </NavLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto mb-2 mb-lg-0"  >
                                {auth.isLoggedIn ?<li className="nav-item">
                                        <NavLink style={{color:'white'}} activeClassName='menu_active' exact className="nav-link active" aria-current="page" to="/service">Service</NavLink>
                                    </li>:null}
                                    {auth.isLoggedIn ? <li className="nav-item">
                                        <NavLink style={{color:'white'}} activeClassName='menu_active' className="nav-link" to="/breathe">Breathe</NavLink>
                                    </li>:null}

                                    {auth.isLoggedIn ?  <li className="nav-item">
                                        <button type="button" className="btn btn-danger" onClick={logoutRedirect}>Logout</button>
                                    </li>:null}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>

        </>
    );
};

export default Navbar;
