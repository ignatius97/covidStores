const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
// The manager model to add new managers to the database
// creating an instance of the schema
const managerSchema = new Schema({
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  phone_number: {
    type: Number,
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
  manager_id_no: {
    type:String,
    trim:true
  },
  username: {
    type:String,
    trim:true
  }

});

managerSchema.plugin(passportLocalMongoose);
// converting a schema to a model
const Manager = mongoose.model('Manager', managerSchema);
// exporting the Manager model
module.exports = Manager;
