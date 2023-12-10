const express = require("express");
const path = require("path");

const fs = require("fs");

const mongoose=require("mongoose")

// for Mac use ==> npx nodemon app.js

  mongoose.connect("mongodb+srv://av:root@sih.370sv4k.mongodb.net/?retryWrites=true&w=majority")  
  .then(()=>{
      console.log('congo MongoDB is finally connected ');
  })
  .catch((e)=>{
      console.log('failed ');
  })

  const parameter=new mongoose.Schema({             
      Username:{
          type:String,
          required:true
      },
      email:{
          type:String,
          required:true
      },
      password:{
          type:String,
          required:true
      }
  })


  const authentication=new mongoose.model( 'authentication',parameter)

  module.exports=authentication 




const app = express();
const port = 80;


app.use("/static", express.static("static"));
app.use(express.urlencoded());


app.use(express.urlencoded({ extended: false }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const con = "This is a random text jada na padhe";
  const params = { title: "This is pug, doggie nhi h", content: con };
 
  res.status(200).render("index.pug");
});

//LOGIN

app.post("/login", async (req, res) => {
  try {
    const check = await authentication.findOne({ email: req.body.email });

    if (check && check.password === req.body.pswd) {
     
      res.redirect("/success");
    } else {
      res.send("incorrect password");   // UPDATE THIS : iski jagah front end me message aana chahie incorrect pass ka
    }
  } catch (e) {
    res.send("wrong details");
  }
});


//SIGNUP

app.post("/signup", async (req, res) => {
  const data = {
    Username: req.body.txt,
    email: req.body.email,
    password: req.body.pswd,
  };

  try {
    const checking = await authentication.findOne({ email: req.body.email });

    if (checking ) {
      res.send("user details already exist");   
    } // UPDATE THIS : iski jagah front end me message aana chahie
    else {
      await authentication.insertMany([data]);
      
      res.redirect("/");
    }
  } catch {
    res.send("wrong inputs");    
  }
});

// forgot password ya update ka bhi option hona chahie na???
app.get("/success", (req, res) => {
  res.status(200).render("image.pug");
});



app.listen(port, () => {
  console.log(`The application started successfully on port ${port}`);
});
