const express = require('express');
const passport = require('passport');
const router = express.Router();

//The route to the employee login page
router.get('/',(req , res)=>{
    res.render('emp/login');
});
//The route to the  admin login page
router.get('/admin',(req,res)=>{
    res.render('admin/index')
})





module.exports = router;