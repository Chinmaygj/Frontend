import Form from "react-bootstrap/Form";
import {AuthContext} from "./context/auth";
import { useContext } from 'react';
import Button from "react-bootstrap/Button";
import Meditate from "../src/images/meditation.jpg"
import Reading from "../src/images/yoga.jpg"
import Dancing from "../src/images/dance.jpg"
import Gardening from "../src/images/gardening.jpg"
import Music from "../src/images/music.jpg"
import React, { useState, useEffect } from 'react';
import './css/Time.css'
import { useHistory, Redirect } from "react-router-dom";


const Service =() => {
    const history = useHistory();
    const [StartTime, setStartTime] = useState("");
    const [EndTime, setEndTime] = useState("");
    const [Interval, setInterval] = useState("");
    const [interest, setinterest] = useState([]);
    const [showform, setShowform] = useState(false);
    const [showinterest, setShowinterest] = useState(true);
    const [buttonTextDancing, setButtonTextDancing] = useState("Subscribe");
    const [buttonTextMeditation, setButtonTextMeditation] = useState("Subscribe");
    const [buttonTextGardening, setButtonTextGardening] = useState("Subscribe");
    const [buttonTextReading, setButtonTextReading] = useState("Subscribe");
    const [buttonTextMusic, setButtonTextMusic] = useState("Subscribe");

    const auth = useContext(AuthContext)
  if (!auth.isLoggedIn) {
    console.log("hello");
  return <Redirect to='/' />
  }
    
    const handleTimeSubmit = async (event)=> {
        
        // console.log(event.target.StartTime.value);
        // console.log(event.target.EndTime.value);
        // console.log(event.target.Interval.value);
        // setStartTime(event.target.StartTime.value);
        // setEndTime(event.target.EndTime.value);
        // setInterval(event.target.Interval.value);
        // console.log(interest);

        if(showinterest)
        {
            setShowinterest(false);
            setShowform(true);
            localStorage.setItem("interest",JSON.stringify(interest))

            const user = {
                username : auth.user.email,
                interestname : interest

            }
            console.log(user);
            try {
                const response = await fetch('http://localhost:8080/userinterests',{
                method:'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
              })
              const responseData = await response.json()
              console.log(responseData)
              if (responseData) {
                console.log(responseData)
              }
              else {
                console.log(responseData)
              }
            } catch (e) {
              console.log("Failed to connect to server")
            }
        }
        else{
            event.preventDefault();
            // setStartTime(event.target.StartTime.value);
            // setEndTime(event.target.EndTime.value);
            // setInterval(event.target.Interval.value);
            // console.log(event.target)
            
            

            const user = {
                username : auth.user.email,
                // interestname : interest,
                startTime : StartTime,
                endTime : EndTime,
                interval : Interval

            }
            try {
                const response = await fetch('http://localhost:8080/userschedule',{
                method:'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
              })
              const responseData = await response.json()
              console.log(responseData)
              if (responseData) {
                console.log(responseData)
                localStorage.setItem("interval",JSON.stringify(user.interval))
                history.push('/')
              }
              else {
                console.log(responseData)
              }
            } catch (e) {
              console.log("Failed to connect to server")
            }

        }
    }
    return (
        <>
            { 
                showform && 
                <>
            <div className ="time container coding">
                <Form >
                    <Form.Group size="lg" controlId="StartTime">
                    <Form.Label>When do you start your work?</Form.Label>
                    <Form.Control
                    required
                    autoFocus
                    type="Time" placeholder="Enter StartTime(HH:MM:SS)"
                    step = "1"
                    value={StartTime}
                    name = "StartTime"
                    onChange={(e) => setStartTime(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="EndTime">
                    <Form.Label>When do you finish your work ?</Form.Label>
                    <Form.Control
                    autoFocus
                    required
                    type="Time" placeholder="Enter EndTime(HH:MM:SS)"
                    step = "1"
                    value={EndTime}
                    name = "EndTime"
                    required
                    onChange={(e) => setEndTime(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="Interval">
                    <Form.Label> Set Interval</Form.Label>
                    <Form.Control
                    autoFocus
                    required
                    type="text" placeholder="Enter Interval in seconds"
                    value={Interval}
                    name = "Interval"
                    required
                    onChange={(e) => setInterval(e.target.value)}
                    />
                    </Form.Group>
                    <Button block size="lg" type="submit" className = "interval_button" onClick={handleTimeSubmit}>Submit</Button>
                </Form>
            </div>
            {/* <div className ="interval_svg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,192L48,213.3C96,235,192,277,288,288C384,299,480,277,576,229.3C672,181,768,107,864,112C960,117,1056,203,1152,197.3C1248,192,1344,96,1392,48L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
            </div> */}
            </>
            }

            {
              showinterest &&
            <div className="content" >
        <h1 className="heading">What Interests do you want?</h1>
        <p className="description">We'll use them to notifiy you with best interests.</p><a className="intrest_flip" href="#!">
          <div className="front" style={{backgroundImage: `url(${Dancing})`}}>
            <p>Dancing</p>
          </div>
          <div className="back">
            <div>
              <p>There are short-cuts to happiness, and dancing is one of them.</p>
              <button className="button" required onClick={()=>{setinterest(prevItems => [...prevItems,"dancing"]);setButtonTextDancing("Subscribed");}}
              // onClick={() => setButtonTextDancing("Subscribed")}
              >{buttonTextDancing}</button>
            </div>
          </div></a><a className="intrest_flip" href="#!">
          <div className="front" style={{backgroundImage: `url(${Meditate})`}}>
            <p>Meditation</p>
          </div>
          <div className="back">
            <div>
              <p>Meditation helps you stay in a clear-headed state so that when challenges come at you, you can deal with them like a ninja – in a calm thoughtful way.</p>
              <button className="button" required onClick={()=>{setinterest(prevItems => [...prevItems,"meditate"]);setButtonTextMeditation("Subscribed");}}
              // onClick={() => setButtonTextMeditation("Subscribed")}
              >{buttonTextMeditation}</button>
            </div>
          </div></a><a className="intrest_flip" href="#!">
          <div className="front" required style={{backgroundImage: `url(${Gardening})`}}>
            <p>Gardening</p>
          </div>
          <div className="back">
            <div>
              <p>The garden suggests there might be a place where we can meet nature halfway.</p>
            <button className="button" required onClick={()=>{setinterest(prevItems => [...prevItems,"gardening"]) ;setButtonTextGardening("Subscribed");} }
            // onClick={() => setButtonTextGardening("Subscribed")}
            >{buttonTextGardening}</button>
            </div>
          </div></a><a className="intrest_flip" href="#!">
          <div className="front" style={{backgroundImage: `url(${Reading})`}}>
            <p>Yoga</p>
          </div>
          <div className="back">
            <div>
              <p>Yoga is the dance of every cell with the music of every breath that creates inner serenity and harmony.</p>
              <button className="button" required onClick={()=>{setinterest(prevItems => [...prevItems,"yoga"]);setButtonTextReading("Subscribed"); } }
              // onClick={() => setButtonTextReading("Subscribed")}
              >{buttonTextReading}</button>
            </div>
          </div></a><a className="intrest_flip" href="#!">
          <div className="front" style={{backgroundImage: `url(${Music})`}}>
            <p>Listening Music</p>
          </div>
          <div className="back">
            <div>
              <p>Music is a language that doesn’t speak in particular words. It speaks in emotions, and if it’s in the bones, it’s in the bones.</p>
              <button className="button" required onClick={()=>{setinterest(prevItems => [...prevItems,"music"]);setButtonTextMusic("Subscribed");} }
              // onClick={() => setButtonTextMusic("Subscribed")}
              >{buttonTextMusic}</button>
            </div>
          </div></a>
          <Button block size="lg" type="submit" onClick={handleTimeSubmit}>Submit</Button>
      </div>
    }
        </>
    );
};

export default Service;
