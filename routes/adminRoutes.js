const express = require('express');
const router = express.Router();
// importing to the models
require('../models/Manager');
require('../models/New_employee');
require('../models/New_product');
require('../models/New_sale'); 
// Getting mongoose and passport to connect to the database and authenticate users
const mongoose = require('mongoose');
const passport = require('passport');
//Getting multer to help in image upload
const multer = require('multer');
// identifying the image folder location after upload
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'uploads/')
    },
    //The name of the image in the database after uploading
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage})
// Giving the models variable names to use
const Manager = mongoose.model('Manager');
const New_employee = mongoose.model('New_employee')
const New_product = mongoose.model('New_product')
const New_sale = mongoose.model('New_sale')

//.........................................The Get routes...............................................

router.get('/buyers',async(req , res)=>{
  if(req.session.user){
  try {
    let items = await New_sale.aggregate([
      {$group:{ _id: { customer_ref_no: "$customer_ref_no", customer_name: "$customer_name",}}}
    ])
    if (req.query.customer_ref_no) {
      items = await New_sale.find({ customer_ref_no: req.query.customer_ref_no })
    }
    res.render('admin/buyers', { new_sales: items })
  } catch (err) {
    res.status(400).send("unable to find items in the database");
  }
} 
else {
  console.log("cant find session")
  res.redirect('/login')
}
});

//Route to the buyers products page
router.get('/buyers_products',async(req , res)=>{
  if(req.session.user){
    try {
      let items = await New_sale.aggregate([
        {$match:{  customer_ref_no: req.query.customer_ref_no}},
        {$group:{ _id: { product_name: "$product_name", serial_number: "$serial_number", customer_ref_no: "$customer_ref_no",}}}
      ])
      res.render('admin/buyers_products', { new_sales: items })
    } catch (err) {
      res.status(400).send("unable to find items in the database");
    }
} 
else {
  console.log("cant find session")
  res.redirect('/login')
}
});

//Route to the add products page
router.get('/add_product',(req , res)=>{
  if(req.session.user){
    res.render('admin/add_product')
  } 
  else {
    console.log("cant find session")
    res.redirect('/login')
  }  
});
//Route to the all products page
router.get('/all_products', async (req, res) => {
  if(req.session.user){
    try {
      let items = await New_product.find()
      if (req.query.product_name ) {
        items = await New_product.find({ product_name: req.query.product_name })
      }
      res.render('admin/all_products', { new_products: items })
    } catch (err) {
      res.status(400).send("unable to find items in the database");
    } 
  } 
  else {
    console.log("cant find session")
    res.redirect('/login')
  }   
  })
//Route to the sales page
router.get('/sales',async(req , res)=>{
  if(req.session.user){
  try {
    let items = await New_sale.aggregate([
      {$match:{$and:[{ serial_number: req.query.serial_number}, {customer_ref_no: req.query.customer_ref_no}]}},
      {$sort:{ pay_interval_left: 1 }}
    ])
    res.render('admin/sales', { new_sales: items })
  } catch (err) {
    res.status(400).send("unable to find items in the database");
  } 
} 
else {
  console.log("cant find session")
  res.redirect('/login')
}  
});
//Route to the add employee page
router.get('/add_employee',(req , res)=>{
  if(req.session.user){
    res.render('admin/add_employee')
  } 
  else {
    console.log("cant find session")
    res.redirect('/login')
  }    
});
//Route to the all employees page
router.get('/add_manager',(req , res)=>{
  if(req.session.user){
        res.render('admin/add_manager')
      } 
      else {
        console.log("cant find session")
        res.redirect('/login')
      }
    
});

router.get('/all_employees',(req , res)=>{
  if(req.session.user){
    New_employee.find({},(err,docs)=>{
        if(err) res.json(err)
        else res.render('admin/all_employees',{new_employees: docs})
    }) 
  } 
  else {
    console.log("cant find session")
    res.redirect('/login')
  }   
});

router.get('/all_managers', async (req, res) => {
  if(req.session.user){
    try {
      let items = await Manager.find()
      if (req.query.firstname) {
        items = await Manager.find({ firstname: req.query.firstname })
      }
      res.render('admin/all_managers', { managers: items })
    } catch (err) {
      res.status(400).send("unable to find items in the database");
    }  
  } 
  else {
    console.log("cant find session")
    res.redirect('/login')
  } 
  })

// loging out of the system
router.get('/log_out',(req , res)=>{
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                // failed to destroy session
            } else {
                res.redirect('../login')
            }
        })
    }
    
});


//.....................................................The Post Routes.......................................
//sending the new records when registering a manager   
router.post("/submit", async (req, res) => {
    try {
        let items = new Manager(req.body);
        await Manager.register(items, req.body.password, (err) => {
            if (err) {
                throw err
            }
            res.redirect('/admin/add_manager')
        });
    } catch (err) {
        res.status(400).send('Sorry! Something went wrong.')
        console.log(err);
    }
});


// submtting the records of a new employee to the database
router.post("/submit_new_employee", async (req, res) => {
    try {
        let items2 = new New_employee(req.body);
        await New_employee.register(items2, req.body.password, (err) => {
            if (err) {
                throw err
            }
            res.redirect('/admin/add_employee')
        });
    } catch (err) {
        res.status(400).send('Sorry! Something went wrong.')
        console.log(err);
    }
});

// submitting a new product to mongo with an image file
router.post('/submit_new_product',upload.single('product_image'),(req , res)=>{
    console.log(req.file);
    const new_product = new New_product({
        product_name:req.body.product_name,
        price:req.body.price,
        category:req.body.category,
        product_image:req.file.path,
        description:req.body.description,
        make:req.body.make,
        date_of_entry:req.body.date_of_entry,
        serial_number:req.body.serial_number,
        color:req.body.color,
        number_in_stock:req.body.number_in_stock,
        pay_interval:req.body.pay_interval,
        initial_pay:req.body.initial_pay,
        pay_interval_cash:req.body.pay_interval_cash,
    });
    new_product.save()
      .then(() => { 
          res.redirect('/admin/add_product');
        })
      .catch((err) => {
        console.log(err);
        res.send('Sorry! Something went wrong.');
      });

});

router.post("/delete", async (req, res) => {
    try {
      await Manager.deleteOne({_id: req.body.id })
      res.redirect('/admin/all_managers')
    } catch (error) {
       res.status(400).send("unable to delete to database");
    }
  })

  router.post("/delete_emp", async (req, res) => {
    try {
      await New_employee.deleteOne({_id: req.body.id })
      res.redirect('/admin/all_employees')
    } catch (error) {
       res.status(400).send("unable to delete to database");
    }
  })

  router.post("/delete_product", async (req, res) => {
    try {
      await New_product.deleteOne({_id: req.body.id })
      res.redirect('/admin/all_products')
    } catch (error) {
       res.status(400).send("unable to delete to database");
    }
  })

  router.post("/edit_product",upload.single('product_image'), async (req, res) => {
    try {
        console.log(req.file)
      await New_product.updateOne({_id: req.body.id },
        { $set: {
            product_name : req.body.product_name,
            price: req.body.price,
            category:req.body.category,
            description:req.body.description,
            make:req.body.make,
            serial_number:req.body.serial_number,
            color:req.body.color,
            number_in_stock:req.body.number_in_stock,
            pay_interval:req.body.pay_interval,
        } })
        if(req.file){
            await New_product.updateOne({_id: req.body.id },
                { $set: {product_image:req.file.path} })
        }
      res.redirect('all_products')
      // console.log(req.body);
    } catch (error) {
    //    res.status(400).send("unable to Update to database");
       console.log(error);
    }
  })

//Route to the buyers page the page gone to after logging in
router.post('/buyers',passport.authenticate('user-local'),async(req , res)=>{
  req.session.user = req.user
    if(req.session.user){
      try {
        let items = await New_sale.aggregate([
          {$group:{ _id: { customer_ref_no: "$customer_ref_no", customer_name: "$customer_name",}}}
        ])
        if (req.query.customer_ref_no) {
          items = await New_sale.find({ customer_ref_no: req.query.customer_ref_no })
        }
        res.render('admin/buyers', { new_sales: items, currentUser:req.session.user })
      } catch (err) {
        res.status(400).send("unable to find items in the database");
      }
  }
});







module.exports = router;