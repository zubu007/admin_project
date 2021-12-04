var fs = require('fs');
var data = fs.readFileSync("data/User.json");
var User = JSON.parse(data);
var cors = require('cors')
var express = require('express');
var app = express();

app.use(cors())
app.use(express.json());
var server = app.listen(3001);


app.post('/users/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    console.log(email);
    var reply = {
        msg: "",
        role: ""
    }

    if (User.Customers.hasOwnProperty(email)) {
        if (User.Customers[email].password == password) {
            reply.msg = "success";
            reply.role = "/dashcust";
            res.send(reply);
        }else {
            reply.msg = "fail";
            res.send(reply);
        }
    }else if (User.Employees.hasOwnProperty(email)) {
        if (User.Employees[email].password == password) {
            reply.msg = "success";
            reply.role = "/dashEmp";
            res.send(reply);
        }else {
            reply.msg = "fail";
            res.send(reply);
        }
    }else {
        reply.msg = "unknown";
        res.send(reply);
    }
})

app.post('/adduser/', function(req, res) {
    // console.log(req.body.roles);
    var email = req.body.email;
    var reply = {
        msg: "success"
    }
    if (email === "") {
        reply.msg = "empty";
    }else if (req.body.roles == "Customer") {
        if (User.Customers.hasOwnProperty(email)) {
            reply.msg = "failure";
        }else {
            User.Customers[email] = req.body;
            User.Customers[email]['archive'] = false;
            reply.msg = "success";
        }   
    }else if(req.body.roles == "Employer"){
        if (User.Employees.hasOwnProperty(email)) {
            reply.msg = "failure";
        }else {
            User.Employees[email] = req.body;
            User.Employees[email]['active'] = false;
            reply.msg = "success";
        }
    }
    fs.writeFileSync("data/User.json", JSON.stringify(User, null, 2));
    res.send(reply);
})