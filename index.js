const express = require("express");
require("./users")
var login = []
var name = ""
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
       res.render("404",{
           "message":"Please Fill All the details",
           "loc":"/sign"
       })
    })
}
else
{
    res.render("404",{
    "message":"User Already Exist. Please Sign Up with another username",
    "loc":"/sign"})
}
})

app.get("/verify",async (req,res) => {
    const fin = await user.find({"username":req.query.username,"password":req.query.password});
    if(JSON.stringify(fin) == "[]")
    {
             res.render("404",{
            "message":"User Not Exist. Please Create a new Account.",
            "loc":"/"
        })
    }
    else
    {
        login.push(req.query.username)
        name = req.query.username
        res.render("dance",{
            "name":req.query.username
        })
    }    
})

app.get("/dance",(req,res) => {
    res.render("dance",{
        "name":name
    })
})



app.get("/contact",(req,res) => {
    res.render("contact",{})
})

app.get("/form",(req,res) => {
    res.render("form",{})
})

app.post("/cont",async(req,res) => {
    const reg = new form(req.body)
    const regis = await form.find(req.body)
    if(JSON.stringify(regis) == "[]")
    {
    reg.save().then(() => {
        res.render("thnks",{})
    }).catch(() => {
        res.render("404",{
            "message":"Please Fill All the details",
            "loc":"/form"
        })
    })
}
else
{
    res.render("404",{
        "message":"You Already Registered for the dance.",
        "loc":"/form"
    })
}
})

app.get("/about",(req,res) => {
    res.render("about",{})
})

app.get("/logout",(req,res) => {
    
    login.splice(name)
    name=""
    res.render("login")
})
app.listen(port,() => {
    console.log("Server is on port " + 3000);
})