/** npm module imports */
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

var cors = require('cors')
/** Source code imports */
// Mongoose models
const UserGroupModel = require('./api/models/userGroupSchema');
const BakeryItemsModel = require('./api/models/bakeryItemSchema');

// Routes
const routes = require('./api/routes/v1');

// Miscellaneos
const USER_GROUP =  require('./test/data/UserGroup');
const BAKERY_ITEMS = require('./test/data/BakeryItems');


// db config
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PORT=process.env.DB_PORT;
const DB_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;


/** Connect to our MongoDB database  
 **/

// Configure mongoose to tell us if we succeed or if we fail to connect to the database
mongoose.connection.on('open', () => `MongoDB: Successfully connected to ${DB_URL}`);
mongoose.connection.on('error', (error) => `MongoDB: Failed to connected to ${DB_URL}. Error ${error}`);
console.log(DB_NAME)
// IMPORTANT: If you are connecting to a database on your local machine be sure it is running first.
// We have to do this before we can save any Models to the database or get data from database.
console.log('MongoDB: Attempting to connect ...');
mongoose
  .connect(`mongodb://localhost:27017/bakeryfunapp`)
  // handle error messages after successfully connectiong
  .catch(error => console.error(`MongoDB: Error ${error}`));


  // Create some test data in the database for our app
 /*  USER_GROUP.forEach(item => {
    const itemModel = new UserGroupModel({ username: item.username,password:item.password,email:item.email, orderNum: item.orderNum });
    // NOTE: If desired see here for how to make this an upsert to get rid of annoying error messages:
    // https://masteringjs.io/tutorials/mongoose/upsert
    itemModel
      .save() 
      .catch(error => {
        console.log(`MongoDB: Error on save: `, error.errmsg);
      })
  });
  
  BAKERY_ITEMS.forEach(item => {
    const itemModel = new BakeryItemsModel({ name:item.name, itemtype:item.itemtype, price:item.price});
    // NOTE: If desired see here for how to make this an upsert to get rid of annoying error messages:
    // https://masteringjs.io/tutorials/mongoose/upsert
    itemModel
      .save() 
      .catch(error => {
        console.log(`MongoDB: Error on save: `, error.errmsg);
      })
  });
 */
/** 
 * Create and start our express server 
 * **/

// express server config
const PORT = 9999;

console.log('starting express')
const app = express();

/** 
 * Configure express server middleware 
 **/

// this allows us to parse HTTP POST request bodies 
app.use(express.json());
app.use(cors());

// For development - console each HTTP request to the server
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} with param ${JSON.stringify(req.params)}`);
  // For things like POST requests that have a body in the HTTP request, print that too
  if (req.body) {
    console.log(JSON.stringify(req.body));
  }

  // We need to call next() to tell express that our middleware function here is done and
  // that express should pass the request on to the next handling function - which will either
  // be more middleware or our routing code!
  next(); 
});

/** Express server routes */
app.get('/', (req, res) => {
  console.log("hello world")
  res.send('Hello World!')
})

/** Mount all our various API routes here */
app.use('/v1', routes);

/** Start express server  */

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})