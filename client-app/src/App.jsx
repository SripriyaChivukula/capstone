import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route,Link  } from "react-router-dom";
import axios from "axios";
import { StyledLink } from "./Style";
import Profile from "./Profile"
import Register from "./Register";


// Source code imports
import ItemsList from "./ItemsList";
import SelectedItems from "./SelectedItems";

import Login from "./Login";

// Our raw data. In a real app we might get this via an API call instead of it being hardcoded.
/* const TYPE_NAMES = {
  fruits: "fruit",
  vegetables: "vegetable",
}; */

const BAKERYTYPE_NAMES = {
  snacks: "snacks",
  beverage: "beverage",
};

function setToken(userToken) {

  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}


function App(props) {
  // create the react component state we'll use to store our data
  
  
  
  const [items, setItems] = useState([])
  const [token, setToken] = useState();

  
  

  useEffect(() => {
    axios
      .get("http://localhost:9999/v1/UserGroup/")
      // handle success
      .then((response) => {
        const data = response.data;
        console.log(data);

        const parsedData = data.map((item) => ({ ...item, checked: false }));

        // set our react state w/data from the server!
        setItems(parsedData);
      });
  }, []);

   /*if(!token) {
    return <Login setToken={setToken} />
  }*/


    const updateItem = (itemName) => {
    console.log("updateItem for ", itemName);
    // Go thru all items; change the desired one; return a new array which has our updated item and all the other items.
    setItems((prevState) => {
      return prevState.map((item) => {
        console.log(item);

        // If it's the desired item, flip the value of `item.checked`
        if (itemName === item.name) {
          console.log("desired item ", item);

          // This could also be done as `return { ...item, checked: !item.checked }`
          const newItem = {
            name: item.name,
            type: item.type,
            checked: !item.checked,
          };

          console.log("updated item ", newItem);
          return newItem;
        }

        // If it's not the desired item, return it unchanged
        return { ...item }; // IMPORTANT: Object destructuring like this creates a **new** object w/the same values
      });
    });
  };

  console.log("App.state.items is ", items);

  // Data being retrieved from server
  if (!items.length) {
    return <div>Loading</div>;
  } else {
    return (
      <Router>
        <div className="App">
          <h1>Grocery List App</h1>
          <div>
            <StyledLink to="/">Selected Items</StyledLink>
          </div>
          <div>
            <StyledLink to="/login">User Login</StyledLink>
          </div>
          <div>
            <StyledLink to="/register">Register</StyledLink>
          </div>
          <div>
            <StyledLink to="/profile">Profile</StyledLink>
          </div>
          <div>
            <StyledLink to="fruits">Fruits</StyledLink>
          </div>
          <div>
            <StyledLink to="vegetable">Vegetables</StyledLink>
          </div>
        </div>
        <Switch>
          <Route  path="/fruit">
            <ItemsList items={items} type="fruit" updateItem={updateItem} />
          </Route>
          <Route  path="/vegetable">
            <ItemsList items={items} type="vegetable" updateItem={updateItem} />
          </Route>
          <Route  path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route  path="/profile">
            <Profile />
          </Route>
          <Route  path="/">
            <SelectedItems items={items} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
