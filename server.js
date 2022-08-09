// jshint esversion:6
const express = require("express");
const path = require("path");
// import all from "sqlite3";
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite3");
// const jsdom = require("jsdom");

// initiating app
const app = express();

// jquery
// const dom = new jsdom.JSDOM("");
// const jq = require("jquery")(dom.window);
// const { JSDOM } = require( "jsdom" );
// const { window } = new JSDOM( "" );
// const $ = require( "jquery" )( window );


// creating db
const db = new sqlite3.Database("data/base.db",sqlite3.OPEN_READWRITE,(err) => {
    if (err) throw err;
    console.log("db opened");
});

// app.use(express.static(path.join()));
app.use(express.static(("statics")));
app.use(express.json());

app.get('/query', (req,res) => {
    console.log("request triggered");
    const users = {
        allUsers: []
    };

    let allTargets = db.all("select * from address",[],(err,rows) => {
        if (err) throw err;
        
        rows.forEach((row) => {
            let userInfo = {};
            console.log("name " + row.name);
            console.log("mac " + row.mac + "\n");
            userInfo.name = row.name;
            userInfo.mac = row.mac
            // console.log(userInfo);
            console.log(users)
            users.allUsers.push(userInfo);
        });
        const jsonData = JSON.stringify(users);
        res.send(jsonData);
    });
});

app.get('/',(req,res) => {
    res.sendFile(__dirname + "/structure/homePage.html");
});

app.post("/sentTargets", (req,res) => {
    // lol
    const {users} = req.body;
    console.log(users[0]);
    let deauthTargets = "";
    let prefixCommand = "-a ";
    for (let index = 0; index < users.length; ++index){
        deauthTargets += "-c " + users[index];
    }
    console.log(deauthTargets);
});
app.listen(3000,"0.0.0.0",function (){
    var port = 3000;
    console.log(__dirname);
    console.log('running on port 3000');
});