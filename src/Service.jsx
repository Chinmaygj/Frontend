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

            const user = {
                username : auth.user.email,
                interestname : interest

            }
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
                interestname : interest,
                startTime : StartTime,
                endTime : EndTime,
                interval : Interval

            }
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
                console.log(responseData)
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
            <div className ="time container">
                <Form >
                    <Form.Group size="lg" controlId="StartTime">
                    <Form.Label>StartTime</Form.Label>
                    <Form.Control
                    autoFocus
                    type="Time"
                    step = "1"
                    value={StartTime}
                    name = "StartTime"
                    required
                    onChange={(e) => setStartTime(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="EndTime">
                    <Form.Label>EndTime</Form.Label>
                    <Form.Control
                    autoFocus
                    type="Time"
                    step = "1"
                    value={EndTime}
                    name = "EndTime"
                    required
                    onChange={(e) => setEndTime(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="Interval">
                    <Form.Label>Interval</Form.Label>
                    <Form.Control
                    autoFocus
                    type="text"
                    value={Interval}
                    name = "Interval"
                    required
                    onChange={(e) => setInterval(e.target.value)}
                    />
                    </Form.Group>
                    <Button block size="lg" type="submit" onClick={handleTimeSubmit}>Submit</Button>
                </Form>
            </div>
            }

            {
              showinterest &&
            <div className="content" >
        <h1 className="heading">What Interests do you want?</h1>
        <p className="description">We'll use them to notifiy you with best interests.</p><a className="card" href="#!">
          <div className="front" style={{backgroundImage: `url(${Dancing})`}}>
            <p>Dancing</p>
          </div>
          <div className="back">
            <div>
              <p>There are short-cuts to happiness, and dancing is one of them.</p>
              <button className="button" required onClick={()=>{setinterest(prevItems => [...prevItems,"Dancing"]);setButtonTextDancing("Subscribed");}}
              // onClick={() => setButtonTextDancing("Subscribed")}
              >{buttonTextDancing}</button>
            </div>
          </div></a><a className="card" href="#!">
          <div className="front" style={{backgroundImage: `url(${Meditate})`}}>
            <p>Meditation</p>
          </div>
          <div className="back">
            <div>
              <p>Meditation helps you stay in a clear-headed state so that when challenges come at you, you can deal with them like a ninja – in a calm thoughtful way.</p>
              <button className="button" required onClick={()=>{setinterest(prevItems => [...prevItems,"Meditate"]);setButtonTextMeditation("Subscribed");}}
              // onClick={() => setButtonTextMeditation("Subscribed")}
              >{buttonTextMeditation}</button>
            </div>
          </div></a><a className="card" href="#!">
          <div className="front" required style={{backgroundImage: `url(${Gardening})`}}>
            <p>Gardening</p>
          </div>
          <div className="back">
            <div>
              <p>The garden suggests there might be a place where we can meet nature halfway.</p>
            <button className="button" required onClick={()=>{setinterest(prevItems => [...prevItems,"Gardening"]) ;setButtonTextGardening("Subscribed");} }
            // onClick={() => setButtonTextGardening("Subscribed")}
            >{buttonTextGardening}</button>
            </div>
          </div></a><a className="card" href="#!">
          <div className="front" style={{backgroundImage: `url(${Reading})`}}>
            <p>Yoga</p>
          </div>
          <div className="back">
            <div>
              <p>Yoga is the dance of every cell with the music of every breath that creates inner serenity and harmony.</p>
              <button className="button" required onClick={()=>{setinterest(prevItems => [...prevItems,"Yoga"]);setButtonTextReading("Subscribed"); } }
              // onClick={() => setButtonTextReading("Subscribed")}
              >{buttonTextReading}</button>
            </div>
          </div></a><a className="card" href="#!">
          <div className="front" style={{backgroundImage: `url(${Music})`}}>
            <p>Listening Music</p>
          </div>
          <div className="back">
            <div>
              <p>Music is a language that doesn’t speak in particular words. It speaks in emotions, and if it’s in the bones, it’s in the bones.</p>
              <button className="button" required onClick={()=>{setinterest(prevItems => [...prevItems,"Music"]);setButtonTextMusic("Subscribed");} }
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
