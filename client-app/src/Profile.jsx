import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import {useState,useEffect} from "react";

function Profile({ username }) {
  const [userProfile,setUserProfile]=useState();
  const [password,setPassword]= useState();
  const [userDelete,setUserDelete]=useState(false);
  const username1 = username;
  console.log(username1)
  console.log(userProfile)
  
  
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
  
  

  async function DeleteUser() {
    return fetch(`http://localhost:9999/v1/usergroup/${username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
     
    })
      .then(response => response.json())
      .then((data) => {
           console.log("info of deleted user",data)
           if(data)
           {
           setUserDelete(true);
           }
      })
      .catch((error) => {
        console.error("Error:", error);
      });


  }
  

  async function UpdateUser(credentials) {
    return fetch(`http://localhost:9999/v1/usergroup/${username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
      .catch(error => {
        console.error('Error:', error)});
        
   }

   const handleUser = async e => 
   {
    e.preventDefault();
    const token = await UpdateUser({  
        password,   
    });
  }
  
  

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
            
            <Button variant="primary" type="submit" name ="view profile" onClick={handleUser}>UpdatePassword</Button>
            
              
              <Form.Control type="password" placeholder="Enter new Password" onChange={e => setPassword(e.target.value)} />
            
            <br />
            <Button variant="primary" type="submit" name ="delete" onClick={DeleteUser}>
              Delete Account
            </Button>
           <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>{username} Account Deleted: {userDelete ? "was successful" : null} </Form.Label>
              <br />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
