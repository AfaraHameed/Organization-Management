var express = require('express');
//const members_helper = require('../helpers/members_helper');
var router = express.Router();
var memberHelper = require('../helpers/members_helper')

/* GET home page. */
router.get('/', function(req, res, next) {
  
 res.render('admincheck',{admin:true})

});

//member details page
router.get('/members_details', function (req,res,next){

    let memberDetail=[{
      username : "aaa",
      email : "ccc@gmail.com",
      monthly_amount : 1122,
      date_m : '22/22/22',
      loan_amount:111,
      date_l:'22/22/22'

    },
    {
      username : "aaa",
      email : "ccc@gmail.com",
      monthly_amount : 1122,
      date_m : '22/22/22',
     

    },
    {
      username : "aaa",
      email : "ccc@gmail.com",
      monthly_amount : 1122,
      date_m : '22/22/22',
      loan_amount:111,
      date_l:'22/22/22'

    }]
    res.render('admin/members_details',{admin:true,memberDetail})
})

router.get('/add_installment',(req,res,next)=>{

  res.render('admin/add_installment',{admin:true})
})

router.get('/add_member',function(req,res,next){
  res.render('admin/add_member',{admin:true})
});
router.post('/add_member',(req,res,next)=>{

  console.log(req.body)
  memberHelper.addMember(req.body,(result)=>{
    res.render('admin/add_member',{admin:true})

  })
})

router.get('/view_members',function(req,res,next){
  
   
  memberHelper.getMembers().then((members)=>{
    console.log(members)
    res.render('admin/view_members',{admin : true , members});
  })
});

module.exports = router;
