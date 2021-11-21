// src/index.js

// import all the modules/packages
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieparser = require("cookie-parser");

// allow the app to use express
const app = express();

// allow the app to use cookieparser
app.use(helmet());

// allow the app to use cookieparser
app.use(cookieparser());

// allow the express server to process POST request rendered by the ejs files 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// allow the express server to read and render the static css file
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");

// render the ejs views
app.set("views", path.join(__dirname, "views"));

// a port number to expose the server
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  // check if user is logged in, by checking cookie
  let username = req.cookies.username;

  // render the home page
  return res.render("home", {
    username,
  });
});

app.get("/login", (req, res) => {
  // check if there is a msg query
  let bad_auth = req.query.msg ? true : false;

  // if there exists, send the error.
  if (bad_auth) {
    res.status(404).send("Falta el nombre de contacto.");
    return res.render("login", {
        error: "Falta el nombre de contacto.",
      });
  } else {
    // else just render the login
    return res.render("login");
  }
});

app.get("/welcome", (req, res) => {
  // get the username
  let username = req.cookies.username;

  // render welcome page
  return res.render("welcome", {
    username,
  });
});

app.post("/process_login", (req, res) => {
  // get the data
  let { username, email, comment } = req.body;
  let nombre= username;
  let pass= email;
  let comm = comment;

  let userdetails_test = {
    username: nombre,
    email: pass,
    comment:comm
  };

  // basic check
  if (username.localeCompare("") != 0) {
    console.log(userdetails_test);
    // saving the data to the cookies
    res.cookie("username", JSON.stringify(userdetails_test));
    // redirect
    return res.redirect("/welcome");
  } else {
    // redirect with a fail msg
    return res.redirect("/login?msg=fail");
  }
});

app.get("/logout", (req, res) => {
  // clear the cookie
  res.clearCookie("username");
  // redirect to login
  return res.redirect("/login");
});

app.listen(PORT, () => console.log(`server started on port: ${PORT}`));