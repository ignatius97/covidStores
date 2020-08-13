const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
// The model to add new emloyees to the database
// creating an instance of the schema
const new_employeeSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  phone_number: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  national_id_no: {
      type:String,
      trim:true
  },
  employee_id_no: {
    type:String,
    trim:true
  },
  username: {
    type:String,
    trim:true
  },

});

new_employeeSchema.plugin(passportLocalMongoose);
// converting a schema to a model
const New_employee = mongoose.model('New_employee', new_employeeSchema);
// exporting the New_employee model
module.exports = New_employee;
