const express = require('express');

var router = express.Router();

const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/',(req,res)=>{
    res.render('employee/addOrEdit',{
        viewTitle:"Insert Employee"
    });
});

router.get('/list',(req,res)=>{
   res.json('from list');
});

router.post('/',(req,res)=>{
    insertRecords(req,res);
});

function insertRecords(req,res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;

    employee.save((err,doc)=>{
        if(!err){
            console.log("record inserted");
            res.redirect('employee/list');
        }
        else{
            console.log('error during record insertion :'+err);
        }
    });
}
module.exports = router;