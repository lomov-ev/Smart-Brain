const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }
});

//app runs express
const app = express();

//express middleware, called in this oreder when route requested
app.use(bodyParser.json());
app.use(cors());

//Routes
app.get("/", (req, res) => { res.send('success'); });
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", profile.profileId(db));
app.put("/image", image.incrementEntries(db));
app.post("/imageurl", (req, res) => { image.handleApiCall(req, res) });

//server listens for requests on a port of choice
app.listen(process.env.PORT || 3000, ()=> {
	console.log(`appisruning ${process.env.PORT}`);
});