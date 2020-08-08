const express = require('express');
const bodyParser= require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
// const Schema = mongoose.Schema;
// var fs = require('fs');
// var multer = require('multer');



const loginRoute = require('./routes/loginRoutes')
const adminRoute = require('./routes/adminRoutes')
const empRoute = require('./routes/empRoutes')
const usersRoute = require('./routes/usersRoutes')

const Manager = require('./models/Manager');
const New_employee = require('./models/New_employee');




mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  
  mongoose.connection
    .on('open', () => {
      console.log('Mongoose connection open');
    })
    .on('error', (err) => {
      console.log(`Connection error: ${err.message}`);
    });

   

const app = express();



// mongoose.connect('mongodb://localhost/covid_stores')
// mongoose.Promise = global.Promise;

//coniguring settttings to use pug
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'))
app.use('/admin/uploads', express.static('uploads'))
app.use('/uploads', express.static('uploads'))
app.use('/emp/uploads', express.static('uploads'))

app.use(bodyParser.urlencoded({extended: true}))

app.use(expressSession);

app.use(passport.initialize());
app.use(passport.session());

passport.use('user-local',Manager.createStrategy());
passport.serializeUser(Manager.serializeUser());
passport.deserializeUser(Manager.deserializeUser());

passport.use('emp-local',New_employee.createStrategy());
passport.serializeUser(New_employee.serializeUser());
passport.deserializeUser(New_employee.deserializeUser());


app.locals.moment = require('moment');

//Route to the users index page

app.use('/',usersRoute);



//.................................................... Manager end routes..........................................
//The route to the  admin login page
app.use('/login', loginRoute);
//Route to the admin page after logging in
app.use('/admin', adminRoute);



//.................................................... Manager end routes..........................................

//.................................................... Employee end routes..........................................
//The route to the  employee login page
app.use('/emp' , empRoute);



//.................................................... Employee end routes..........................................






app.get('*',(req , res)=>{
    res.send('No such page')
})

app.listen(4000,()=>{
    console.log("express is running on port 4000")
});
