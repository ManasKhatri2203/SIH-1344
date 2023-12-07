const express=require('express');
const path=require("path");
const fs=require("fs");

const app=express();
const port=80;

// For serving static files
app.use("/static", express.static('static'));
app.use(express.urlencoded());

//setting template engine as pug
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));


app.get('/',(req,res)=>{
       const con="This is a random text jada na padhe";
       const params={'title':'This is pug, doggie nhi h',"content" : con};
       //  res.status(200).render('index.pug',params)
        res.status(200).render('index.pug')
})

app.post('/',(req,res)=>{
       // console.log(req.body);
       txt=req.body.txt;
       email=req.body.email;
       pswd=req.body.pswd;

       let opttowrite=`The username is: ${txt} and the email is ${email} and the password of the user is ${pswd}`;
       fs.writeFileSync('output.txt',opttowrite);
       const params={'title':'Successfully Signed Up'};
       res.status(200).render('index.pug',params)
})

// app.get("/demo", (req,res)=>{
//        res.status(200).render('demo', { title: 'Hey whats up dude', message: 'Hello there! kem cho maja ma' });
// })

// app.get("/", (req,res)=>{
//        res.send("This is homepage of express app");
// })


// app.get("/about", (req,res)=>{
//       res.send("This is about page");
// })

// app.get("/this", (req,res)=>{
//     res.status(404).send("This page is not found");
// })

// for starting server
app.listen(port, ()=>{
       console.log(`The application started successfully on port ${port}`);
})