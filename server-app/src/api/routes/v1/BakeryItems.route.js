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

router.get("/", (req, res) => {
  console.log("hello bakeryitems");
  BakeryGroup_Item
    .find()
    .then((allBakeryGroup_Item) => {
     const formattedItems = allBakeryGroup_Item.map(item => ({ name: item.name , itemtype: item.itemtype, price: item.price }));
      console.log("hello", allBakeryGroup_Item);
      res.send(allBakeryGroup_Item);
    })
    .catch((error) => res.send(`Error on ${req.path} - ${error}`));
});

router.get("/:itemtype", (req, res) => {
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
    BakeryGroup_Item.find({ itemtype: itemtype })
      .then((desiredItems) => res.send(formatItems(desiredItems)))
      // Error handling
      .catch((error) => res.send(`Error - ${JSON.stringify(error)}`));
  } else {
    res.send(`Invalid route - ${req.path}. Valid routes are proper usernames`);
  }
});

router.get("/:price", (req, res) => {
  const price = req.params.price;
  console.log("inprice", price);
  if (price) {
    const formatItems = (items) =>
      items.map((item) => ({
        name: item.name,
        itemtype: item.itemtype,
        price: item.price,
      }));
    BakeryGroup_Item.find({ price: price })
      .then((desiredItems) => res.send(formatItems(desiredItems)))
      // Error handling
      .catch((error) => res.send(`Error - ${JSON.stringify(error)}`));
  } else {
    res.send(`Invalid route - ${req.path}. Valid routes are proper usernames`);
  }
});

module.exports = router;
