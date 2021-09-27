import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import Profile from "./Profile";
import PropTypes from 'prop-types';



   

function Login(props)
{


    const [username, setUserName] = useState();
    const [password, setPassword] = useState();


    async function CheckUser(credentials) {
        return fetch('http://localhost:9999/v1/UserGroup/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
       }
    

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await CheckUser({
          username,
          password
        });
        console.log(token)
        sessionStorage.setItem('token', JSON.stringify(token));


        if(token) {
          return <Profile />
        }



      // props.setToken(token)
      }


    return (
        <div>
    <Form>
    <Form.Group className="mb-3" controlId="formUserName">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" placeholder="Enter username" onChange={e => setUserName(e.target.value)}  />
    <Form.Text className="text-muted" >
      We'll never share your username with anyone else.
    </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
   </Form.Group>
   <Button variant="primary" type="submit"  onClick={handleSubmit}>
    Login
   </Button>
   </Form>
        </div>
    )

}


export default Login;
