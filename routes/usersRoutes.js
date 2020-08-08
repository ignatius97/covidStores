const express = require('express');
// const Manager = require('../models/manager');
const router = express.Router();

require('../models/New_product');
const mongoose = require('mongoose');


const New_product = mongoose.model('New_product')

// Creating the route to the users home page and pulling the products from the database
router.get('/', async (req, res) => {
    try {
      let new_product = await New_product.find()

    //   if (req.query.product_name) {
    //     new_product_clothes = await New_product.find({ product_name: req.query.product_name })
    //   }
      res.render('user/index',{  new_products: new_product })

    } catch (err) {
      res.status(400).send("unable to find items in the database");
    }  })

//- The route to the categories page
router.get('/user_category', async (req, res) => {
  try {
    let new_product = await New_product.find({category: req.query.category})

  //   if (req.query.product_name) {
  //     new_product_clothes = await New_product.find({ product_name: req.query.product_name })
  //   }
    res.render('user/categories',{  new_products: new_product })

  } catch (err) {
    res.status(400).send("unable to find items in the database");
  }  
})    

    router.get("/product_details", async (req,res)=>{
        try {
            let items = await New_product.find({ _id: req.query.id })
    
            res.render('user/product_details', { new_products: items })
          } catch (err) {
            res.status(400).send("unable to find items in the database");
          }  })

module.exports = router;