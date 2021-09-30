import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link,Nav } from "react-router-dom";
import axios from "axios";
import { StyledLink,StyledNav } from "./Style";
import Profile from "./Profile";
import Register from "./Register";
import Header from "./Header";
import Home from "./Home";
import Snacks from "./Snacks";
import Beverage from "./Beverage";
// Source code imports
import ItemsList from "./ItemsList";
import SelectedItems from "./SelectedItems";

import Login from "./Login";

// Our raw data. In a real app we might get this via an API call instead of it being hardcoded.
/* const TYPE_NAMES = {
  fruits: "fruit",
  vegetables: "vegetable",
}; */

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

const BAKERYTYPE_NAMES = {
  snacks: "snacks",
  beverage: "beverage",
};

function App(props) {
  // create the react component state we'll use to store our data

  const [items, setItems] = useState([]);
  const [token, setToken] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:9999/v1/bakeryitems")
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
            itemtype: item.itemtype,
            price: item.price,
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
      <div className="App">
        <div>
          <Header />
        </div>
        <Router>
          <nav className = "navbar">
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/Login">Login</StyledLink>
            <StyledLink to="/Register">Register</StyledLink>
            <StyledLink to="/Profile">Profile</StyledLink>
            <StyledLink to="/Snacks">Snacks</StyledLink>
            <StyledLink to="/Beverage">Beverage</StyledLink>
            <StyledLink to="/SelectedItems">Shopping Cart</StyledLink>
            {/*  <StyledLink to="/NonFiction">NonFiction</StyledLink> */}
          </nav>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route path="/snacks">
              <ItemsList items={items} type="snacks" updateItem={updateItem} />
            </Route>
            <Route path="/beverage">
              <ItemsList
                items={items}
                type="beverage"
                updateItem={updateItem}
              />
            </Route>
            <Route path="/selecteditems">
              <SelectedItems items={items} />
            </Route>
          </Switch>
        </Router>
        <div id="intro"><h2>
             <p>Need a quick Snack or Coffee!!..</p>
             <p>You are at Right Place.</p>
            <p>Place an Order and Relax.</p>
           <p> You will be served right away!!</p> </h2></div>
      </div>
     
    );
  }
}

export default App;
