
import React, { useState, useEffect} from "react";
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import { useHistory, Redirect } from "react-router-dom";
import notification from "../src/images/notification.png";
import interest from "../src/images/interest.png";
import meditate from "../src/images/meditate.png"
import './css/App.css'
import {AuthContext} from "./context/auth";
import { useContext } from 'react';


const Home =() => {
  const history = useHistory();
  const auth = useContext(AuthContext)
  const [loginButton, setloginButton] = useState(false);
  const [email,setEmail] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");



 /* function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.email.value);
    // console.log(event.target.FirstName.value);
    // console.log(event.target.LastName.value);
    setEmail(event.target.email.value);
    setFirstName(event.target.email.value);
    setLastName(event.target.email.value);

    const user = {

      email:event.target.email.value,

    };
    setloginButton(false);
      console.log(user);
      auth.login();
      auth.setLoggedInUser(user);
      console.log(auth.isLoggedIn);
      history.push('/service')
  }*/

  const submitHandler = async (event) => {
    event.preventDefault();
    setEmail(event.target.email.value);
    setFirstName(event.target.firstName.value);
    setLastName(event.target.lastName.value);

    const user = {
      firstName : event.target.firstName.value,
      lastName:event.target.lastName.value,
      email:event.target.email.value,

    };

    try {
        const response = await fetch('https://reqres.in/api/users',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      const responseData = await response.json()
      console.log(responseData)
      if (responseData) {
        auth.login()
        setloginButton(false);
        console.log("logged");
        auth.setLoggedInUser(user)
        history.push('/service')
      }
      else {
        console.log(responseData)
      }
    } catch (e) {
      console.log("Failed to connect to server")
    }
  }




  const getNotification = async () => {
    console.log(auth.isLoggedIn)
    if (auth.isLoggedIn) {
      let notification=''
      //call to notification api route goes here...
      try {
        const response = await fetch(`https://reqres.in/api/users/${auth.user.email}`)
      const responseData = await response.json()
      console.log(responseData)
      if (responseData) {
        notification= "This is notification from api"
      }
      else {
        console.log(responseData)
      }
    } catch (e) {
      console.log("Failed to connect to server")
    }
  
    const image = {
      "music":"https://randomwordgenerator.com/img/picture-generator/film-102681_640.jpg",
      "running":"https://randomwordgenerator.com/img/picture-generator/film-102681_640.jpg",
      "yoga":"https://randomwordgenerator.com/img/picture-generator/film-102681_640.jpg",
      "reading":"https://randomwordgenerator.com/img/picture-generator/film-102681_640.jpg",
      "gaming":"https://randomwordgenerator.com/img/picture-generator/film-102681_640.jpg"         
    }

    const Intrest =["music","running","yoga","reading","gaming"]

    var Notification_title;
    var Notification_image;
    for (let index = 0; index < 6; index++) {
      if("yoga" ==  Intrest[index])                               // add responsedata
      {
            Notification_title = Intrest[index]
            Notification_image = image[Intrest[index]]
      }
    }
      addNotification({
        title: `${Notification_title}`,
        message: `${notification}`,
        theme: 'darkblue',
        backgroundBottom:"https://randomwordgenerator.com/img/picture-generator/film-102681_640.jpg",
        duration: 7000,
        icon:`${Notification_image}`,
        backgroundTop: 'green',
        native: true, // when using native, your OS will handle theming.
        silent:false
    });
    }else{
      return;
    }

};
 useEffect(() => {
    let interval;

      interval = setInterval(() => {
        console.log('In setInterval');
          getNotification();
    
      }, 5000);

    
    return () => clearInterval(interval);
  }, []); 




    return (
        <>
            <section id="header" className="d-flex align-items-center">

                <div className="container-fluid nav_bg">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="row">
                            <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify- content-center flex-column">
                                {!auth.isLoggedIn ? <h1>
                                     A healthy and happy body is worth the <strong className="brand-name"> Effort</strong>
                                </h1>:<h1>Hello <strong className="brand-name"> {auth.user.firstName} </strong> Welcome!! </h1>}


                                <h2 className="my-3">
                                    We are the team of talented developer making websites
                                </h2>

                                {!auth.isLoggedIn ? <div className="mt-3">
                                    <button className="btn-get-started" onClick={()=>{setloginButton(true)}} > Login </button>
                                </div>:null}
                           </div>
                           <div className="col-lg-6 order-1 order-lg-2 header-img">
                                {((!auth.isLoggedIn && !loginButton)  || (auth.isLoggedIn && loginButton) || (auth.isLoggedIn && !loginButton)) && <div className="animation-two"><lottie-player className="animation-two" src="https://assets2.lottiefiles.com/packages/lf20_ocGoFt.json"  background="transparent"  speed="1"  style={{width: '450px', height: '450px'}}  loop  autoplay></lottie-player></div>}
                                {(!auth.isLoggedIn && loginButton)  && <div class="text-center">
                                  <form onSubmit={submitHandler}>
                                  <div class="form-group">
                                      <label for="exampleInputEmail1">Email address</label>
                                      <input type="email" class="form-control" id="exampleInputEmail1" required name="email" placeholder="Enter email"/>
                                      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                  </div>
                                  <div class="form-group">
                                      <label >First Name</label>
                                      <input type="firstName" class="form-control"  name="firstName" required placeholder="Enter First Name"/>
                                     
                                  </div>
                                  <div class="form-group">
                                      <label >Last Name</label>
                                      <input type="lastName" class="form-control"  name="lastName" required placeholder="Enter Last Name"/>
                                  </div>
                                  <button type="submit" class="btn btn-primary" >Submit</button>
                                  </form>
                               </div>}
                            </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="boundary" data-aos="fade-down" data-aos-offset="400"  data-aos-duration="2000"  data-aos-once="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path fill="#24a0ed" fill-opacity="1" d="M0,128L80,149.3C160,171,320,213,480,234.7C640,256,800,256,960,245.3C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
            <h1 className="text-center" style={{color:"white",background:"#24a0ed",fontSize:'3.5em'}}><span  data-aos="zoom-in" data-aos-delay="500"  >Features We Offer</span></h1>
            <svg style={{position:'relative',bottom:'10px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#24a0ed" fill-opacity="1" d="M0,128L360,128L720,320L1080,128L1440,192L1440,0L1080,0L720,0L360,0L0,0Z"></path></svg>
            </div>


            <section className="features container">

              <div className="row"   data-aos="fade-left" style={{marginBottom:'5em'}}>
                <div className="col-lg-6 " >
                  <img style={{width:'90%',objectFit:'cover'}} src={notification}  alt= "home img" />
                </div >
                <div className="col-lg-6 card"  style={{borderLeftColor:'#24a0ed ',borderLeftWidth:'2px',borderLeftStyle:'solid'}}>
                  <h2 style={{color:'#24a0ed',marginTop:'5px'}}>Push Notification</h2>
                  <hr></hr>
                  <p style={{color:'grey',fontSize:'1.2em'}}>lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum</p>
                </div>
              </div>

              <div className="row" data-aos="fade-right" style={{marginBottom:'5em'}}>
                <div className="col-lg-6 card"  style={{borderLeftColor:'#24a0ed ',borderLeftWidth:'2px',borderLeftStyle:'solid'}}>
                  <h2 style={{color:'#24a0ed',marginTop:'5px'}}>We consider your interest</h2>
                  <hr></hr>
                  <p style={{color:'grey',fontSize:'1.2em'}}>lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlo</p>
                </div>
                <div className="col-lg-6 ">
                  <img style={{width:'90%',objectFit:'cover'}} src={interest}  alt= "home img" />

                </div>
              </div>
              <div className="row" data-aos="fade-left" style={{marginBottom:'5em'}}>
                <div className="col-lg-6 ">
                  <img style={{width:'90%',objectFit:'cover'}} src={meditate}  alt= "home img" />
                </div>
                <div className="col-lg-6 card"  style={{borderLeftColor:'#24a0ed ',borderLeftWidth:'2px',borderLeftStyle:'solid'}}>
                  <h2 style={{color:'#24a0ed',marginTop:'5px'}}>Meditate</h2>
                  <hr></hr>
                  <p style={{color:'grey',fontSize:'1.2em'}}>Our developers along with the doctors have created the animation which tells the best time for which we should breath in and breath out in order to reach a calm state!</p>
                </div>
              </div>
            </section>

            <section className=" text-center" style={{background:'#393e46',height:'17em', color:'white'}}>
                <div  style={{paddingTop:'5.5em'}}>
                  <h3> Made with love ♥</h3>
                  <br/>
                  <p style={{color:'#24a0ed', letterSpacing:"5px"}}>© ℗ ® ™ Copyright 2021 OurBrand</p>
                </div>
            </section>


        </>
    );
}
export default Home;
