const express = require('express');
const passport = require('passport');
const router = express.Router();

//The route to the  admin login page
router.get('/',(req , res)=>{
    res.render('emp/login');
});

router.get('/admin',(req,res)=>{
    res.render('admin/index')
})





module.exports = router;