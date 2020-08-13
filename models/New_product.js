const mongoose = require('mongoose');
const { isDate } = require('moment');
const Schema = mongoose.Schema;
// The model to add new product to the database
// creating an instance of the schema
const new_productSchema = new Schema({
  product_name: {
    type: String,
    trim: true,
  },
  price: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  product_image: {
    type: String, 
  },
  description: {
    type: String,
    trim: true,
  },
  make: {
    type: String,
    trim: true,
  },
  date_of_entry: {
    type: Date,
    trim: true,
  },
  serial_number: {
    type: String,
    unique:true,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  number_in_stock: {
    type: String,
    trim: true,
  },
  initial_pay: {
    type: String,
    trim: true,
  },
  pay_interval: {
    type: String,
    trim: true,
  },
  pay_interval_cash:{
    type: String,
    trim:true,
  }

  
});
// converting a schema to a model
const New_product = mongoose.model('New_product', new_productSchema);
// exporting the New_product model
module.exports = New_product;
