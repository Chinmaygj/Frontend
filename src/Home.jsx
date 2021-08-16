
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
  const [user,setUser] = useState({});
  const [interestList,setInterestList] = useState([]);
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

    const user ={
      firstname : event.target.firstName.value,
      lastname:event.target.lastName.value,
      username:event.target.email.value,

    };

  //   try {
  //     const response = await fetch(`http://localhost:8080/userauthentication/${auth.user.email}`)

  //   // console.log("api call",user)
  //   const responseData = await response.json()
  //   console.log(responseData)
  //   // console.log(user)
  //   if (responseData.username) {
  //     auth.login()
  //     setloginButton(false);
  //     console.log("logged");
  //     auth.setLoggedInUser(user)
  //     localStorage.setItem("user",JSON.stringify(user))
  //     history.push('/Refresh')
  //     return 
  //   }
  //   else {
  //     console.log(responseData)
  //   }
  // } catch (e) {
  //   console.log(e);
  //   console.log("Failed to connect to server")
  // }
  
    try {
        const response = await fetch('http://localhost:8080/userauthentication',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      // console.log("api call",user)
      const responseData = await response.json()
      console.log(responseData)
      // console.log(user)
      if (responseData) {
        auth.login()
        setloginButton(false);
        console.log("logged");
        auth.setLoggedInUser(user)
        localStorage.setItem("user",JSON.stringify(user))
        // localStorage.setItem("interval",JSON.stringify("5000"))
        history.push('/service')
      }
      else {
        console.log(responseData)
      }
    } catch (e) {
      console.log(e);
      console.log("Failed to connect to server")
    }
  }
  const getNotification = async () => {
    console.log(auth.isLoggedIn)
    if (auth.isLoggedIn) {
      let notification=''
      let responseData
      try {
      const response = await fetch(`http://localhost:8080/usernotification/${auth.user.email}`)
      responseData = await response.json()
      console.log(responseData)
      if (responseData) {
        notification= responseData.notification;
        setInterestList([...interestList, responseData.interest])
        localStorage.setItem("interval",JSON.stringify(responseData.interval))
      }
      else {
        console.log(responseData)
      }
    } catch (e) {
      console.log("Failed to connect to server")
    }
  
    const image = {
      "music":"https://static.vecteezy.com/system/resources/previews/001/923/794/non_2x/young-girl-listening-to-music-free-vector.jpg",
      "dancing":"https://thumbs.dreamstime.com/b/street-dance-concept-flat-design-hip-hop-break-dancer-vernacular-dances-urban-contex-culture-entertainment-85715605.jpg",
      "yoga":"https://cdn.pixabay.com/photo/2020/09/08/06/23/yoga-5553729_960_720.png",
      "meditation":"https://thumbs.dreamstime.com/b/tree-yoga-pose-woman-silhouette-cliff-meditation-sunset-athletic-practicing-gymnastics-fitness-orange-yellow-sky-165957976.jpg",
      "gardening":"https://www.handyman.net.au/wp-content/uploads/2019/11/garden-tools.jpg"         
    }

    const Interest =["music","dancing","yoga","meditation","gardening"]
    var Notification_title 
    var Notification_image;
    console.log(responseData)
    if(!responseData){
      Notification_title = "Stay Hydrated";
      notification = "Relax and Get yourself a cup of water";
      setInterestList([...interestList, "Relax"])
      Notification_image = "https://thumbs.dreamstime.com/b/tree-yoga-pose-woman-silhouette-cliff-meditation-sunset-athletic-practicing-gymnastics-fitness-orange-yellow-sky-165957976.jpg"
    }
    else if(responseData.interest === "default" )
    {
      Notification_title = "Relax";
      notification = responseData.notification;
      Notification_image = "https://thumbs.dreamstime.com/b/tree-yoga-pose-woman-silhouette-cliff-meditation-sunset-athletic-practicing-gymnastics-fitness-orange-yellow-sky-165957976.jpg"
    }
    else{
    Notification_title = responseData.interest;
    
    console.log(responseData);
    for (let index = 0; index < 6; index++) {
      if(responseData.interest ===  Interest[index])                               // add responsedata
      {
            // console.log(responseData.interest)
            // Notification_title = Interest[index]
            Notification_image = image[Interest[index]]
      }
    }
  }
      addNotification({
        title: `${Notification_title}`,
        message: `${notification}`,
        theme: 'darkblue',
        // backgroundBottom:"https://randomwordgenerator.com/img/picture-generator/film-102681_640.jpg",
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
  const loggedInUser = localStorage.getItem("user")
  const getinterest = localStorage.getItem("interest")
  

 if (getinterest) {
  console.log(JSON.parse(localStorage.getItem("interest")))
  setInterestList([...interestList, ...JSON.parse(localStorage.getItem("interest"))])
 }

  if (loggedInUser && !auth.isLoggedIn) {
    console.log(loggedInUser)
    console.log("hiiiiiiiii")
    auth.login()
    setloginButton(false);
    console.log("logged");
    auth.setLoggedInUser(JSON.parse(loggedInUser))
    console.log(auth.user)
    history.push('/refresh')

  }
}, []); 

//useEffect(() => {
//  localStorage.setItem("user",JSON.stringify(user))
//}, [loginButton]); 

 useEffect(() => {
    let interval;
    // var BreakInterval
    
    // if(JSON.parse(localStorage.getItem("interval"))){
    //   BreakInterval = JSON.parse(localStorage.getItem("interval"))
    // }
    // else{
    //   BreakInterval = 5000
    // }
      interval = setInterval(() => {
        if(localStorage.getItem("interval"))
        {
          console.log("this is present")
        }
        // BreakInterval = JSON.parse(localStorage.getItem("interval"))
        console.log('In setInterval');
          getNotification();
    
      }, localStorage.getItem("interval")?parseInt(JSON.parse(localStorage.getItem("interval")))*1000:5000);

    
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
                                {!auth.isLoggedIn ? <h1 data-aos="fade-up" data-aos-once="true">
                                  Take a <strong className="brand-name"> Break</strong> and give your soul what it needs. 
                                </h1>:<div> <h1>Hello <strong className="brand-name"> {auth.user.firstName} </strong> Welcome!! We will Notify you based on your Interests</h1> 
                                
                                <div >{interestList.map((ele)=>{return <h2><li style={{listStyleType:"none",color:"#24a0ed"}}>{ele.toUpperCase()}</li></h2>})}</div>
                                </div>}
                                <h2  data-aos="fade-up" data-aos-delay="300" data-aos-once="true" className="my-3">
                                When you’re striving to hit a deadline,
                                Taking a much-needed break is essential if you want to perform at your best.
                                </h2>

                                {!auth.isLoggedIn ? <div className="mt-3" data-aos="fade-up" data-aos-once="true" data-aos-delay = "400">
                                    <button className="btn-get-started" onClick={()=>{setloginButton(true)}} > Login </button>
                                </div>:null}
                           </div>
                           <div className="col-lg-6 order-1 order-lg-2 header-img" data-aos="fade-down">
                                {((!auth.isLoggedIn && !loginButton)  || (auth.isLoggedIn && loginButton) || (auth.isLoggedIn && !loginButton)) && <div className="animation-two"><lottie-player className="animation-two" src="https://assets2.lottiefiles.com/packages/lf20_ocGoFt.json"  background="transparent"  speed="1"  style={{width: '500px', height: '500px'}}  loop  autoplay></lottie-player></div>}
                                {(!auth.isLoggedIn && loginButton)  && <div class="text-left" style={{width:"65%",marginLeft:"40px"}}>
                                  <form data-aos="fade-down" onSubmit={submitHandler}>
                                  <div class="form-group" >
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
                  <p style={{color:'grey',fontSize:'1.2em'}}>Forget to take a break when so many deadlines are racing against your timelines? 
                  Don't worry we will notify you whenever you need to take a break. 
                  Just subscribe your interests at our site and you are ready to be remembered about your breaks!!</p>
                </div>
              </div>

              <div className="row" data-aos="fade-right" style={{marginBottom:'5em'}}>
                <div className="col-lg-6 card"  style={{borderLeftColor:'#24a0ed ',borderLeftWidth:'2px',borderLeftStyle:'solid'}}>
                  <h2 style={{color:'#24a0ed',marginTop:'5px'}}>We consider your interest</h2>
                  <hr></hr>
                  <p style={{color:'grey',fontSize:'1.2em'}}>Just tell us which hobbies interests you the best at your leisure time. 
                  It could be anything between yoga and meditation to calm you down or dancing and singing to energize you again for the next hours work. 
                  Just with a simple subscription we are ready to notify you some fun activities.</p>
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
