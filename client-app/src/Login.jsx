import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import Profile from "./Profile";
import Register from "./Register"
import PropTypes from 'prop-types';



   

function Login(props)
{


    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [flag,SetFlag]=useState(false);

    async function CheckUser(credentials) {
        return fetch('http://localhost:9999/v1/usergroup/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
          .catch(error => {
            console.error('Error:', error)});
            
       }
    

    const handleSubmit = async e => {
        e.preventDefault();
        
        const token = await CheckUser({username,password});
        console.log(token)
        sessionStorage.setItem('token', JSON.stringify(token));
        if(token) {
          SetFlag(true)
        }
      }
        
      
      
          const handleRegister = async e=>{
            e.preventDefault();
            SetFlag(false)
          }

        

        



      // props.setToken(token)
  
      


    return (
        <div>
    <Form>
    <Form.Group className="mb-3" controlId="formUserName">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="Enter username" onChange={e => setUserName(e.target.value)}  />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
   </Form.Group>
   <Button variant="primary" type="submit"  onClick={handleSubmit}>Login</Button>
   <Button variant="primary" type="submit"  onClick={handleRegister}>Register</Button>
   <div>
   {flag ? <Profile username = {username} /> :<Register/>}
   </div>
   </Form>
        </div>
    )

}


export default Login;
