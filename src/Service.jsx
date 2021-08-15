import Form from "react-bootstrap/Form";
import {AuthContext} from "./context/auth";
import { useContext } from 'react';
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from 'react';
import './css/Time.css'
import { useHistory, Redirect } from "react-router-dom";


const Service =() => {
    const history = useHistory();
    const [StartTime, setStartTime] = useState("");
    const [EndTime, setEndTime] = useState("");
    const [Interval, setInterval] = useState("");
    const [Intrest, setIntrest] = useState([]);
    const [showform, setShowform] = useState(false);
    const [showIntrest, setShowIntrest] = useState(true);

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
        // console.log(Intrest);

        if(showIntrest)
        {
            setShowIntrest(false);
            setShowform(true);

            const user = {
                username : auth.user.email,
                intrestname : Intrest

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
                intrestname : Intrest,
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
            <h1> Welcome Services  Page </h1>
            { 
                showform && 
            <div className ="time container">
                <Form >
                    <Form.Group size="lg" controlId="StartTime">
                    <Form.Label>StartTime</Form.Label>
                    <Form.Control
                    autoFocus
                    type="Time"
                    value={StartTime}
                    name = "StartTime"
                    onChange={(e) => setStartTime(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="EndTime">
                    <Form.Label>EndTime</Form.Label>
                    <Form.Control
                    autoFocus
                    type="Time"
                    value={EndTime}
                    name = "EndTime"
                    onChange={(e) => setEndTime(e.target.value)}
                    />
                    </Form.Group>
                    <Form.Group size="lg" controlId="Interval">
                    <Form.Label>Interval</Form.Label>
                    <Form.Control
                    autoFocus
                    type="Text"
                    value={Interval}
                    name = "Interval"
                    onChange={(e) => setInterval(e.target.value)}
                    />
                    </Form.Group>
                    <Button block size="lg" type="submit" onClick={handleTimeSubmit}>Submit</Button>
                </Form>
            </div>
            }

            {
              showIntrest &&
            <div className="content" >
        <h1 className="heading">Card Flip</h1>
        <p className="description">Hover over a card to flip it.</p><a className="card" href="#!">
          <div className="front" style={{backgroundImage: 'url(//source.unsplash.com/300x401)'}}>
            <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
          </div>
          <div className="back">
            <div>
              <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
              <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
              <button className="button" onClick={()=>{setIntrest([...Intrest,"music"])} }>Click Here</button>
            </div>
          </div></a><a className="card" href="#!">
          <div className="front" style={{backgroundImage: 'url(//source.unsplash.com/300x402)'}}>
            <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
          </div>
          <div className="back">
            <div>
              <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
              <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
              <button className="button" onClick={()=>{setIntrest(prevItems => [...prevItems,"music"])} }>Click Here</button>
            </div>
          </div></a><a className="card" href="#!">
          <div className="front" style={{backgroundImage: 'url(//source.unsplash.com/300x403)'}}>
            <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
          </div>
          <div className="back">
            <div>
              <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
              <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
            <button className="button" onClick={()=>{setIntrest(prevItems => [...prevItems,"music"])}}>Click Here</button>
            </div>
          </div></a><a className="card" href="#!">
          <div className="front" style={{backgroundImage: 'url(//source.unsplash.com/300x404)'}}>
            <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
          </div>
          <div className="back">
            <div>
              <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
              <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
              <button className="button" onClick={()=>{setIntrest(prevItems => [...prevItems,"music"])}}>Click Here</button>
            </div>
          </div></a><a className="card" href="#!">
          <div className="front" style={{backgroundImage: 'url(//source.unsplash.com/300x405)'}}>
            <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
          </div>
          <div className="back">
            <div>
              <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
              <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
              <button className="button" onClick={()=>{setIntrest(prevItems => [...prevItems,"music"])}}>Click Here</button>
            </div>
          </div></a><a className="card" href="#!">
          <div className="front" style={{backgroundImage: 'url(//source.unsplash.com/300x406)'}}>
            <p>Lorem ipsum dolor sit amet consectetur adipisi.</p>
          </div>
          <div className="back">
            <div>
              <p>Consectetur adipisicing elit. Possimus, praesentium?</p>
              <p>Provident consectetur natus voluptatem quis tenetur sed beatae eius sint.</p>
              <button className="button" onClick={()=>{setIntrest(prevItems => [...prevItems,"music"])}}>Click Here</button>
            </div>
          </div></a>
          <Button block size="lg" type="submit" onClick={handleTimeSubmit}>Submit</Button>
      </div>
    }
        </>
    );
};

export default Service;
