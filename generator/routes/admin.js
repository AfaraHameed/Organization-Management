var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  let members = [{
    user_name:"aaaaa",
    email :"aaa@gmail.com",
    phone:"121232323"
  
  },
  {
    user_name:"bbbb",
    email :"bbb@gmail.com",
    phone:"121232323"
  },
  {
    user_name:"aaaaa",
    email :"aaa@gmail.com",
    phone:"121232323"
  }
  ]

  res.render('admin/view_members',{admin : true , members});
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

module.exports = router;
