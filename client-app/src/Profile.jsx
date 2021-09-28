import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {useState,useEffect} from "react";

function Profile({ username }) {
  const [userProfile,setUserProfile]=useState();
  const username1 = username;
  console.log(username1)
  
  
  async function ProfileUser() {
    return fetch(`http://localhost:9999/v1/usergroup/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
     
    })
      .then(response => response.json())
      .then((data) => {
           console.log("the data",data)
           setUserProfile(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(()=>{
    ProfileUser()
  },[])
  
  if(!userProfile){
    return (<div>Loading</div>)
  }

  return (
    <div>
      <div className="container">
        <div className="small-container">
          <Form>
            <h1>Profile</h1>
            <br />
            <br />
            <br />
            <br />
            <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>UserName {username}</Form.Label>
              <br />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit" name ="view profile" onClick={ProfileUser}>Update Password</Button>
            <Button variant="primary" type="submit" name ="delete" onClick={() => console.log('delete!')}>
              Delete Account
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
