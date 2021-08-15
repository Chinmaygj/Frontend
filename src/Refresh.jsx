import React from 'react';
import { useContext } from 'react';
import {AuthContext} from "./context/auth";
import { useHistory, Redirect } from "react-router-dom";

const Refresh =() => {
    const auth = useContext(AuthContext)
  
  
    if (!auth.isLoggedIn) {
      console.log("hello");
    return <Redirect to='/' />
    }
    
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser && auth.isLoggedIn) {
      console.log("Returning tp home")
      return <Redirect to='/' />
    }

    return (
        <>
           
        </>
    );
};

export default Refresh;
