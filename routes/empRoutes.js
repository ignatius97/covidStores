const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../models/New_product');
require('../models/New_sale');
const mongoose = require('mongoose');
const { distinct } = require('../models/New_sale');


const New_product = mongoose.model('New_product')
const New_sale = mongoose.model('New_sale')

// employee log in


//The route to the  employee login page
router.post('/dashboard',passport.authenticate('emp-local'),async(req , res)=>{
    req.session.user = req.user
    if(req.session.user){
        try {
            let new_product = await New_product.find()
      
            if (req.query.product_name) {
              new_product = await New_product.find({ product_name: req.query.product_name  })
            }
            res.render('emp/employee_dashboard',{  new_products: new_product , currentUser:req.session.user })
      
          } catch (err) {
            res.status(400).send("unable to find items in the database");
          }
    }
});














router.get('/dashboard',async(req , res)=>{
  
  if(req.session.user){
      try {
          let new_product = await New_product.find()
    
          // if (req.query.product_name) {
          //   new_product = await New_product.find({ product_name: req.query.product_name , currentUser:req.session.user })
          // }
          res.render('emp/employee_dashboard',{  new_products: new_product , currentUser:req.session.user })
    
        } catch (err) {
          res.status(400).send("unable to find items in the database");
        }
      } else {
        console.log("cant find session")
        res.redirect('/login')
    }
});

// router.get('/dashboard',(req , res)=>{
//     res.render('emp/employee_dashboard')
// });
//Route to the add new payment page
router.get('/add_new_payment',async(req , res)=>{
    try {
        let items = await New_product.find({ _id: req.query.id })

        res.render('emp/add_new_payment', { new_products: items })
      } catch (err) {
        res.status(400).send("unable to find items in the database");
      }
    
});
// The route for sending new sale to the database
router.post('/add_new_payment',async(req , res)=>{
  const new_sale = new New_sale(req.body);

new_sale.save()
  .then(() => { 
      
      res.redirect('buyers');
    })
  .catch((err) => {
    console.log(err);
    res.send('Sorry! Something went wrong.');
  });

  
});

//Route to the add new instalment page
router.post('/add_new_instalment',async(req , res)=>{
  const new_sale = new New_sale(req.body);

new_sale.save()
  .then(() => { 
      
      res.redirect('dashboard');
    })
  .catch((err) => {
    console.log(err);
    res.send('Sorry! Something went wrong hee.');
  });


});

//Route to the employee sales page
router.get('/sales',async(req , res)=>{
  try {
    let items = await New_sale.aggregate([

      {$match:{$and:[{ serial_number: req.query.serial_number}, {customer_ref_no: req.query.customer_ref_no}]}},
      {$sort:{ pay_interval_left: 1 }}
    ])
    // if (req.query.serial_number) {
    //   items = await New_sale.find({ serial_number: req.query.serial_number })
    // }
    res.render('emp/employee_sales', { new_sales: items })
  } catch (err) {
    res.status(400).send("unable to find items in the database");
  } 
});

//Route to the buyers page
router.get('/buyers',async(req , res)=>{
  try {
    let items = await New_sale.aggregate([
      {$group:{ _id: { customer_ref_no: "$customer_ref_no", customer_name: "$customer_name",}}}
    ])
    if (req.query.customer_ref_no) {
      items = await New_sale.find({ customer_ref_no: req.query.customer_ref_no })
    }
    res.render('emp/buyers', { new_sales: items })
  } catch (err) {
    res.status(400).send("unable to find items in the database");
  }
});

// Route for goimg to the categories page
router.get('/category',async(req , res)=>{
  
  if(req.session.user){
      try {
        let new_product = await New_product.find({category: req.query.category})
    
          // if (req.query.product_name) {
          //   new_product = await New_product.find({ product_name: req.query.product_name , currentUser:req.session.user })
          // }
          res.render('emp/categories',{  new_products: new_product , currentUser:req.session.user })
    
        } catch (err) {
          res.status(400).send("unable to find items in the database");
        }
  }
});

//Route to the buyers products page
router.get('/buyers_products',async(req , res)=>{
  try {
    let items = await New_sale.aggregate([
      {$match:{  customer_ref_no: req.query.customer_ref_no}},
      {$group:{ _id: { product_name: "$product_name", serial_number: "$serial_number", customer_ref_no: "$customer_ref_no",}}}
    ])
    // if (req.query.customer_ref_no) {
    //   items = await New_sale.find({ customer_ref_no: req.query.customer_ref_no })
    // }
    res.render('emp/buyers_products', { new_sales: items })
  } catch (err) {
    res.status(400).send("unable to find items in the database");
  }
});

//Route to the employee orders page
router.get('/orders',(req , res)=>{
    res.render('emp/employee_orders')
});

router.get('/log_out',(req , res)=>{
    res.redirect('../login')
});


module.exports = router;