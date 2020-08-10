const express = require("express");
require("./users")
var login = []
const path = require("path")
const port = process.env.PORT || 3000;
const app = express();
const user = require("./schema")
const form = require("./schema2")
var conso = require("consolidate")
const bodyparser = require("body-parser");
const cons = require("consolidate");
app.use(express.urlencoded())
app.engine("html",conso.swig);
app.set("view engine","html")
app.set("views",path.join(__dirname,"./public"))
app.use(express.static("static"))
app.get("",(req,res) => {
    res.render("login",{})
})
app.get("/sign",(req,res) => {
    res.render("signup",{})
})

app.post("/reg",async (req,res) => {
    const fin = await user.find({"name":req.body.name,"email":req.body.email,"password":req.body.password});
    const User = await new user(req.body)
    if(JSON.stringify(fin) == "[]")
    {
    User.save().then(() => {
        res.render("login",{})
    }).catch(() => {
       console.log("Error!")
       res.render("404",{})
    })
}
else
{
    res.render("404",{})
}
})

app.get("/verify",async (req,res) => {
    const fin = await user.find({"username":req.query.username,"password":req.query.password});
    if(JSON.stringify(fin) == "[]")
    {
        login.push(req.query.username)
        res.render("404",{})
    }
    else
    {
        res.render("dance",{})
    }    
})

app.get("/home",(req,res) => {
    res.render("home",{})
})

app.get("/contact",(req,res) => {
    res.render("contact",{})
})

app.get("/form",(req,res) => {
    res.render("form",{})
})

app.post("/cont",(req,res) => {
    const reg = new form(req.body)
    reg.save().then(() => {
        res.render("dance",{})
    }).catch(() => {
        res.render("404",{})
    })
})
app.get("/logout",(req,res) => {
    res.render("login")
})
app.listen(port,() => {
    console.log("Server is on port " + 3000);
})