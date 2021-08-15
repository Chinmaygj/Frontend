
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Home from "./Home";
import Refresh from "./Refresh";
import Service from "./Service";
import Navbar from "./Navbar";
import Breathe from "./Breathe";


import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {AuthContext} from "./context/auth";
import { useContext } from 'react';
import React, { useState, useEffect} from "react";
import { Notifications } from 'react-push-notification';


const App =() => {
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const [user , setUser] = useState({});


    const login= ()=>{
      setIsLoggedIn(true);

    }
    const auth = useContext(AuthContext)
    const logout= ()=>{
      setIsLoggedIn(false);

      
    }

    const setLoggedInUser=(lUser)=>{

      setUser({
        email:lUser.email,
        firstName:lUser.firstName,
        lastName:lUser.lastName
      })
      console.log(user);
    }


    return (
      <AuthContext.Provider value={{user:user,setLoggedInUser:setLoggedInUser, isLoggedIn:isLoggedIn, login:login,logout:logout}}>
          <Router>
          <Navbar />
          <Notifications />
          <Switch>

              <Route exact path= "/" component={Home} />
              <Route exact path= "/service" component={Service} />
              <Route exact path= "/refresh" component={Refresh} />

              <Route exact path= "/breathe" component={Breathe} />
              <Redirect to="/" />
          </Switch>
          </Router>
          </AuthContext.Provider>
    );
};

export default App;
