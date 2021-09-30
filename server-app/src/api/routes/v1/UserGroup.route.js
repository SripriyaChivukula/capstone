const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");

/** Source code imports */
// Mongoose models
const UserGroup_Item = require("../../models/userGroupSchema");
const BakeryGroup_Item = require("../../models/bakeryItemSchema");

// create new express router
const router = express.Router();

/**
 * @api {get} v1/grocery-items List all grocery items
 * @apiDescription Returns an array of all grocery items
 * @apiVersion 1.0.0
 * @apiName GetGroceryItems
 * @apiGroup GroceryItem
 * @apiPermission none
 *
 * @apiSuccess (200) {Object[]} groceryItems List of grocery itemsb
 * @apiSuccess (200) {String}   name       Name of grocery item
 * @apiSuccess (200) {String}   email      Type of grocery item
 *
 * @apiError (Bad Request 400)
 */

//const formatItems = items => items.map(item => ({ name: item.username, type: item.type }));

router.get("/", (req, res) => {
  UserGroup_Item
    // Calling .find() on a model w/out any arguments gets all documents for that collection : )
    .find()
    .then((allUserGroup_Item) => {
      const formattedItems = allUserGroup_Item.map((item) => ({
        username: item.username,
        password: item.password,
        email: item.email,
        orderNum: item.orderNum,
      }));
      res.send(formattedItems);
    })
    .catch((error) => res.send(`Error on ${req.path} - ${error}`));
});

/***
 * NOTE: If desired you could use async/await instead of promises, which would look like this:
 * See https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
 * and https://blog.risingstack.com/mastering-async-await-in-nodejs/
  ```
      app.get('/grocery-items', async (req, res) => {
        const groceryItems = await GroceryItem.find();
        const formattedItems = groceryItems.map(item => ({ name: item.name, type: item.type }));
        res.send(formattedItems);
      })
  ```
 */

/**
 * @api {get} v1/grocery-items/:type List all grocery items of type
 * @apiDescription Returns an array of all grocery items of a certain type
 * @apiVersion 1.0.0
 * @apiName GetGroceryItemsOfType
 * @apiGroup GroceryItem
 * @apiPermission none
 *
 * @apiSuccess (200) {Object[]} groceryItems List of grocery itemsb
 * @apiSuccess (200) {String}   name       Name of grocery item
 * @apiSuccess (200) {String}   email      Type of grocery item
 *
 * @apiError (Bad Request 400)
 */

/*router.get('/:username&:password', (req, res) => {
  const username = req.params.username;
  const password = req.params.password;

  if(( username == 'username') && (password == 'password')) {
    const formatItems = items => items.map(item => ({ username: item.username, email: item.email, orderNum:item.orderNum }));
    UserGroup_Item
      .find({ username: 'username', password:'password'})
      .then(desiredItems => res.send(formatItems(desiredItems)))
      // Error handling
      .catch(error => res.send(`Error - ${JSON.stringify(error)}`));
  }

  else {
    res.send(`Invalid route - ${req.path}. Valid routes are 'snacks', 'beverages'`)
  }
})*/

// TODO: Add apidoc documentation
//move bakeryitems route off the user group route
router.get("/bakeryitems", (req, res) => {
  console.log("hello bakeryitems");
  BakeryGroup_Item.find()
    .then((allBakeryGroup_Item) => {
      // const formattedItems = allBakeryGroup_Item.map(item => ({ name: item.name , itemtype: item.itemtype, price: item.price }));
      console.log("hello", allBakeryGroup_Item);
      res.send(allBakeryGroup_Item);
    })
    .catch((error) => res.send(`Error on ${req.path} - ${error}`));
});

router.get("/:username", (req, res) => {
  const username = req.params.username;
  console.log("hello username", username);
  if (username) {
    const formatItems = (items) =>
      items.map((item) => ({
        username: item.username,
        email: item.email,
        orderNum: item.orderNum,
      }));
    UserGroup_Item.find({ username: username })
      .then((desiredItems) => res.send(desiredItems))
      // Error handling
      .catch((error) => res.send(`Error - ${JSON.stringify(error)}`));
  } else {
    res.send(`Invalid route - ${req.path}. Valid routes are proper usernames`);
  }
});

router.post("/", async (req, res) => {
  console.log("hello");
  const body = req.body;
  const saltRounds = 10;
  bcrypt.hash(body.password, saltRounds, (err, passwordHash) => {
    // create mongoose GroceryItem model instance. we can then save this to mongodb as a document
    const newItem = new UserGroup_Item({
      username: body.username,
      password: passwordHash,
      email: body.email,
      orderNum: body.orderNum,
    });
    console.log(newItem);
    newItem
      .save()
      .then(() =>
        res.send(
          `${JSON.stringify(req.body)} User account created Successfully!`
        )
      )
      // Error handling
      .catch((error) =>
        res.send(
          `ERROR: Unable to create ${JSON.stringify(
            req.body
          )} bakery item. Err is ${JSON.stringify(error)}`
        )
      );
  });
});

/* router.post('/', (req, res) => {
    const body = req.body;
  
    // create mongoose GroceryItem model instance. we can then save this to mongodb as a document
    const newItem = new UserGroup_Item({ username: body.username, email: body.email, password: body.password , orderNum:body.orderNum});
    
    // save to mongodb
    newItem
      .save()
      .then(() => res.send(`${JSON.stringify(req.body)} User created!`))
      // Error handling
      .catch(error => res.send(`ERROR: Undable to create ${JSON.stringify(req.body)} user. Err is ${JSON.stringify(error)}`));
  })*/

router.put("/:username", async (req, res, next) => {
  //const username = req.body.username
  const username = req.params.username;
  const body = req.body;
  const password = body.password;
  console.log(password);
  const option = { new: true };
  const saltRounds = 10;

  console.log("hello from put", username);
  // create mongoose GroceryItem model instance. we can then save this to mongodb as a document

  // create mongoose GroceryItem model instance. we can then save this to mongodb as a document
  try {
    const newItem = await UserGroup_Item.findOneAndUpdate(
      {username},
      password,
      option
    );
    res.send(newItem);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:username", async (req, res, next) => {
  const username = req.params.username;
  try {
    const result = await UserGroup_Item.findOneAndDelete(username);
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/auth/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const formatItems = (items) =>
    items.map((item) => ({
      username: item.username,
      email: item.email,
      orderNum: item.orderNum,
    }));
  const user = await UserGroup_Item.findOne({ username: username });
  console.log(password);
  console.log(user);

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  console.log(passwordCorrect);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  };

  // console.log(process.env.SECRET)
  const token = jwt.sign(userForToken, "meowww");

  res.status(200).send({ token, username: user.username });
});

/* router.get("/bakeryitems/:itemtype", (req, res) => {
  const itemtype = req.params.itemtype;
  console.log(itemtype);
  if (itemtype) {
    console.log(itemtype);
    const formatItems = (items) =>
      items.map((item) => ({
        name: item.name,
        itemtype: item.itemtype,
        price: item.price,
      }));
    BakeryGroup_Item.findOne({ itemtype: itemtype })
      .then((desiredItems) => res.send(formatItems(desiredItems)))
      // Error handling
      .catch((error) => res.send(`Error - ${JSON.stringify(error)}`));
  } else {
    res.send(`Invalid route - ${req.path}. Valid routes are proper usernames`);
  }
}); */

/* router.get("/bakeryitems/:price", (req, res) => {
  const price = req.params.price;

  if (price) {
    const formatItems = (items) =>
      items.map((item) => ({
        name: item.name,
        itemtype: item.itemtype,
        price: item.price,
      }));
    BakeryGroup_Item.findOne({ price })
      .then((desiredItems) => res.send(formatItems(desiredItems)))
      // Error handling
      .catch((error) => res.send(`Error - ${JSON.stringify(error)}`));
  } else {
    res.send(`Invalid route - ${req.path}. Valid routes are proper usernames`);
  }
}); */

/*const formatItems = items => items.map(item => ({ username: item.username,password:item.password, email: item.email, orderNum:item.orderNum }));
      UserGroup_Item
      .findOne(username)
      .then(desiredItems => res.send(formatItems(desiredItems)))
      // Error handling
      .catch(error => res.send(`Error - ${JSON.stringify(error)}`));*/

// res.send("hello post")

/*const body = req.body
    const saltRounds = 10
    bcrypt.hash(body.password, saltRounds,(err,passwordHash)=>{
    
    
    // create mongoose GroceryItem model instance. we can then save this to mongodb as a document
     const newItem = new UserGroup_Item({ username: body.username, password: passwordHash, email: body.email , orderNum:body.orderNum})
    newItem
      .save()
      .then(() => res.send(`${JSON.stringify(req.body)} Bakery Item created!`))
      // Error handling
      .catch(error => res.send(`ERROR: Unable to create ${JSON.stringify(req.body)} bakery item. Err is ${JSON.stringify(error)}`)) 
    })});*/
module.exports = router;
