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
   Employee.find((err,docs)=>{
       if(!err){
            console.log("fetch list"+docs.length);
            res.render("employee/list",{
                list:docs
            });
       }
       else{
           console.log('Error in retrieving employee list :'+err);
       }

   })
});

router.post('/',(req,res)=>{
    if(req.body._id=='')
    {
        insertRecords(req,res);
    }else{
        console.log("update record");
        updateRecord(req,res);
    }
});
function updateRecord(req,res){
    Employee.findOneAndUpdate({ _id : req.body_id },req.body,{new : true},(err,doc)=>{//if doc don't have any new value then new will be false
        if(!err)
        {
            console.log("record updated");
            res.redirect('employee/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render('employee/addOrEdit',{
                    viewTitle : "Update Employee",
                    employee: req.body
                })
            }else{
                console.log('error during record insertion :'+err);
            }

        }
    });
}
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
                if(err.name== 'ValidationError'){
                    handleValidationError(err,req.body);
                    res.render('employee/addOrEdit',{
                        viewTitle : "Insert Employee",
                        employee: req.body
                    })
                }
                else{
                    console.log('error during record insertion :'+err);
                }
        }
    });
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id',(req,res)=>{
    console.log("IN Update");
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err)
        {
            res.render("employee/addOrEdit",{
            viewTitle: "Update Employee",
            employee : doc
            });
        }else{
            
        }
    });
});
module.exports = router;