var fs = require('fs');
var data = fs.readFileSync("data/User.json");
var User = JSON.parse(data);
var timedata = fs.readFileSync("data/time.json");
var Time = JSON.parse(timedata);
var cors = require('cors')
var express = require('express');
var app = express();

app.use(cors())
app.use(express.json());
var server = app.listen(3001);

app.post('/edituser', function(req, res) {
    var email = req.body.email;
    var reply = {
        msg: ""
    }
    User.Customers[email].name = req.body.name;
    User.Customers[email].phone = req.body.phone;
    User.Customers[email].details = req.body.details;
    fs.writeFileSync("data/User.json", JSON.stringify(User, null, 2));
    reply.msg = 'success'
    res.send(reply)

})


// Logout time
app.post('/logout', function (req, res) {
    var time = req.body.time;
    var email = req.body.email;
    var reply = {
        msg: "",
    };
    Time[email][Object.keys(Time[email])[Object.keys(Time[email]).length - 1]]["out"] = time;
    fs.writeFileSync("data/time.json", JSON.stringify(Time, null, 2));
    reply.msg = "Logout time updated";
    res.send(reply);

});

// Archive customer
app.post('/archive', function (req, res) {
    var email = req.body.email;
    var reply = {
        msg: "",
    };
    if (User.Customers[email].archived == false) {
        User.Customers[email].archived = true;
    } else {
        User.Customers[email].archived = false;
    }
    fs.writeFileSync("data/User.json", JSON.stringify(User, null, 2));
    reply.msg = "Customer archived";
    res.send(reply);
});

// Get customer data
app.get('/customerlist', function(req, res) {
    res.send(User.Customers);
});

// Get Employee data
app.get('/employeelist', function(req, res) {
    res.send(User.Employees);
});

// Delete Employee
app.post('/deleteemployee', function (req, res) {
    var email = req.body.email;
    var reply = {
        msg: "",
    };
    reply.msg = delete User.Employees[email];
    fs.writeFileSync("data/User.json", JSON.stringify(User, null, 2));
    res.send(reply);
});

// Delete Customer
app.post('/deletecustomer/', function(req, res) {
    var email = req.body.email;
    var reply = {
        msg: "",
    }

    reply.msg = delete User.Customers[email];
    fs.writeFileSync("data/User.json", JSON.stringify(User, null, 2));
    res.send(reply);
})

// log in API
app.post('/users/', function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var time = req.body.time;
    var reply = {
        msg: "",
        role: "",
        user: {}
    }

    if (User.Customers.hasOwnProperty(email)) {
        if (User.Customers[email].password == password) {
            reply.msg = "success";
            reply.role = "/dashcust";
            reply.user = User.Customers[email];
            res.send(reply);
        }else {
            reply.msg = "fail";
            res.send(reply);
        }
    }else if (User.Employees.hasOwnProperty(email)) {
        if (User.Employees[email].password == password) {
            reply.msg = "success";
            reply.role = "/dashEmp";
            reply.user = User.Employees[email];
            Time[email][time] = {"in": time};
            fs.writeFileSync("data/time.json", JSON.stringify(Time, null, 2));
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

// sign up API
app.post('/adduser/', function(req, res) {
    // console.log(req.body.roles);
    // console.log(req.body);
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