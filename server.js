const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = __dirname + '/app/views/';

const app= express();

app.use(express.static(path));

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-ulrencoded
app.use(bodyParser.urlencoded({ extended:true }));

const db = require("./app/models");

db.sequelize.sync();

/* db.sequelize.sync({force:true}).then(() => {
    console.log("Drop and re-sync db.");
}); */

// simple route
/* app.get("/", (req, res)=>{
    res.json({ message: "Welcome to my application."});
}); */

app.get('/', function (req, res){
    res.sendFile(path+"index.html");
});

require ("./app/routes/tutorial.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});






/* 
    Express is for building the REST APIs
    body-parser helps to parse the request and create the req.body object
    cors provides Express middleware to enable CORS with varous options


    - Create an Express app, then add body-parser and cors middlewares using app.use() method.
    - Origin is http://localhost:8081
    - Define a GET route which is simple for test
    - Listen on port 8080 for incoming requests

*/