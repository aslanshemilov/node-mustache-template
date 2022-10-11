// ./backend/app.js

/************************************
 *                                  *
 * done by Aslan Shemilov           *
 * aslanshemilov@gmail.com          *
 * Computer Programmer Analyst      *
 *                                 *
 * ********************************** 
 */

 /*
Notes for nodejs
$ npm install --global lite-server
 
# To run locally: 
$ npm run dev
*/

"use strict"; 

const express = require("express");
// Ceate a new express app
const app = express();
// cfenv provides access to your Cloud Foundry environment
const cfenv = require("cfenv");
// start server on the specified port and binding host
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
const port = appEnv.port || 3000;

var path = require("path");
//var pkg = require(path.join(__dirname, "package.json"));

const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
//var engines = require("consolidate");
var mustacheExpress = require("mustache-express");

/*
// Configuration
app.configure(function () {
  app.register(".html", template);
  app.set("views", __dirname + "/views");
  app.set("view options", { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + "/public"));
});
*/

// config
//app.engine("html", EJS.renderFile);

// https://medium.com/@drewword/express-mustache-quick-start-36c3421af91
// Register '.mustache' extension with The Mustache Express
app.engine("mustache", mustacheExpress());
// set .mustache as the default extension 
app.set("view engine", "mustache"); //https://mustache.github.io/
//app.set('view options',{layout:true});
//app.use(express.static(path.join(__dirname, 'src/views')));
app.set('views', path.join(__dirname, '../frontend/views'));

// Serve static files from the frontend folders
//app.use('/', express.static(path.join(__dirname, 'frontend')));
//app.use(process.cwd(), "../frontend/public"));
app.use(express.static(path.join(__dirname, "../frontend/public"))); 

app.get("/", function (req, res) {
  /*  
  res.status(200).send(`
            <div>
            <h1>Todo List</h1>
            <ul>
                <li style="text-decoration:line-through">Learn about Mustache template</li>
                <li style="text-decoration:line-through">Create my own templates</li>
            </ul>
            </div>
        `);
    */
   res.render("index", {
     title: "Index Page",
     img: "Image",
     nav: [
       {
         Link: "/login",
         Text: "Login",
         Class: "nav-item",
         ClassLink: "nav-link",
       },
       {
         Link: "/admin",
         Text: "Admin",
         Class: "nav-item",
         ClassLink: "nav-link",
       },
     ]
   });
});

app.listen(port, (err) => {
    if (err) { console.log("app.js::listen: ", err); }
    console.log(`App listening on port at: http://localhost:${port}/`);
    console.log("Environment: %s \n", app.get("env"));
});