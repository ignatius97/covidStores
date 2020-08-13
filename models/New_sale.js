const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// The model to add new sale to the database
// creating an instance of the schema
const new_saleSchema = new Schema({
    customer_name:{
        type:String, 
        trim:true,
    },
    customer_ref_no:{
        type:String,
        trim:true,
    },
    phone_number:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        trim:true
    },
    address:{
        type:String,
        trim:true
    },
    national_id_no:{
        type:String,
        trim:true
    },
    referee_no:{
        type:String,
        trim:true
    },
    ammount_paid:{
        type:String,
        trim:true
    },
    payment_time:{
        type:String,
        trim:true
    },
    purchase_receipt:{
        type:String,
        trim:true
    },
    product_name:{
        type:String,
        trim:true
    },
    price:{
        type:String,
        trim:true
    },
    product_image:{
        type:String,
        trim:true
    },
    serial_number:{
        type:String,
        trim:true
    },
    pay_interval:{
        type:String,
        trim:true
    },
    pay_interval_left:{
        type:String,
        trim:true
    },
    next_payable_amount:{
        type:String,
        trim:true
    },
    total:{
        type:String,
        trim:true
    },
    balance:{
        type:String,
        trim:true
    },
    date_of_pay:{
        type:Date,
        trim:true
    },
    next_pay_date:{
        type:Date,
        trim:true
    }
})
// converting a schema to a model
const New_sale = mongoose.model('New_sale', new_saleSchema);
// exporting the New_sale model
module.exports = New_sale;