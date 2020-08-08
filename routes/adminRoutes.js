const express = require('express');
// const Manager = require('../models/manager');
const router = express.Router();
require('../models/Manager');
require('../models/New_employee');
require('../models/New_product');
require('../models/New_sale');
const mongoose = require('mongoose');
const passport = require('passport');

const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage})

const Manager = mongoose.model('Manager');
const New_employee = mongoose.model('New_employee')
const New_product = mongoose.model('New_product')
const New_sale = mongoose.model('New_sale')

//Route to the admin page after logging 
// router.get('/',(req , res)=>{
//     if(req.session.user){
//         res.render( 'admin/manager_dashboard');
//     }
//     else{
//         res.send('no user')
//     }


// });


// router.get('/dashboard',(req , res)=>{
//   if(req.session.user){
//   res.render('admin/manager_dashboard',{ currentUser:req.session.user});
//   }
// });


//Route to the add products page
router.get('/add_product',(req , res)=>{
    res.render('admin/add_product')
});
//Route to the all products page

router.get('/all_products', async (req, res) => {
    try {
      let items = await New_product.find()
      if (req.query.product_name ) {
        items = await New_product.find({ product_name: req.query.product_name })
      }
     
      res.render('admin/all_products', { new_products: items })
    } catch (err) {
      res.status(400).send("unable to find items in the database");
    }  })
//Route to the sales page
// router.get('/sales',(req , res)=>{
//     res.render('admin/sales')
// });

router.get('/sales',async(req , res)=>{
  try {
    let items = await New_sale.aggregate([

      {$match:{$and:[{ serial_number: req.query.serial_number}, {customer_ref_no: req.query.customer_ref_no}]}},
      {$sort:{ pay_interval_left: 1 }}
    ])
    // if (req.query.serial_number) {
    //   items = await New_sale.find({ serial_number: req.query.serial_number })
    // }
    res.render('admin/sales', { new_sales: items })
  } catch (err) {
    res.status(400).send("unable to find items in the database");
  } 
});


//Route to the orders page
router.get('/orders',(req , res)=>{
    res.render('admin/orders')
});
//Route to the add employee page
router.get('/add_employee',(req , res)=>{
    res.render('admin/add_employee')
});
//Route to the all employees page
router.get('/add_manager',(req , res)=>{
    


    // if(req.session.user){
        res.render('admin/add_manager')
    // }
    
});

router.get('/all_employees',(req , res)=>{
    New_employee.find({},(err,docs)=>{
        if(err) res.json(err)
        else res.render('admin/all_employees',{new_employees: docs})
    })  
});

// router.get('/all_managers',(req , res)=>{
//     Manager.find({},(err,docs)=>{
//         if(err) res.json(err)
//         else res.render('admin/all_managers',{managers: docs})
//     })  
// });
// The route for searching for the first name in the database
router.get('/all_managers', async (req, res) => {
    try {
      let items = await Manager.find()
      if (req.query.firstname) {
        items = await Manager.find({ firstname: req.query.firstname })
      }
      res.render('admin/all_managers', { managers: items })
    } catch (err) {
      res.status(400).send("unable to find items in the database");
    }  })

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
    

// const manager = new Manager(req.body);
// manager.save()
//     .then(() => { 
//         res.redirect('/admin/add_manager');
//     })
//     .catch((err) => {
//     console.log(err);
//     res.send('Sorry! Something went wrong.');
//     });

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


// router.post('/submit_new_employee',(req , res)=>{
    
//     const new_employee = new New_employee(req.body);
//     new_employee.save()
//       .then(() => { 
          
//           res.redirect('/admin/add_employee');
//         })
//       .catch((err) => {
//         console.log(err);
//         res.send('Sorry! Something went wrong.');
//       });

// });
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

  router.get("", async (req,res)=>{
    try {
        let items = await New_product.find({ _id: req.query.id })

        res.render('admin/edit_product', { new_products: items })
      } catch (err) {
        res.status(400).send("unable to find items in the database");
      }  })


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

  //Route to the buyers page


router.get('/buyers',async(req , res)=>{
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
});

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
    res.render('admin/buyers_products', { new_sales: items })
  } catch (err) {
    res.status(400).send("unable to find items in the database");
  }
});




module.exports = router;