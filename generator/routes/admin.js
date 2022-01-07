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

    res.render('admin/members_details',{admin:true,memberDetail})
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

router.get('/add_installment',(req,res,next)=>{

  res.render('admin/add_installment',{admin:true})
})

router.get('/searchId_addInstallment',(req,res,next)=>{

  res.render('admin/searchId_addInstallment',{admin:true})
})

// router.post('/searchId_addInstallment',(req,res,next)=>{

//   memberHelper.getNameEmail(req.body).then((result)=>{
//     console.log(req.body)
//      console.log(result)
//      res.render('admin/add_installment',{admin:true})
//   })

// })



router.post('/searchId_addInstallment',(req,res,next)=>{
  memberHelper.getNameEmail(req.body.RegId).then((member)=>{
    console.log(req.body)
    console.log(member)
   res.render('admin/add_installment',{admin:true,member})
   //res.render('admin/just',{admin:true,member})
  })

})

router.post('/add_installment',(req,res,next)=>{
  memberHelper.insertInstallment(req.body).then((result)=>{
    console.log(result)
    res.render('admin/add_installment',{admin:true})

  })
})


router.get('/searchId_viewInstallment',(req,res,next)=>{

  res.render('admin/searchId_viewInstallment',{admin:true})
})
router.post('/searchId_viewInstallment',(req,res,next)=>{
  memberHelper.getMonthlyInstallment(req.body.RegId).then((installment)=>{
    console.log(req.body)
    console.log(installment)
   res.render('admin/view_installment',{admin:true,installment})
   //res.render('admin/just',{admin:true,member})
  })

})

router.get('/searchId_loanWithdrawal',(req,res,next)=>{

  res.render('admin/searchId_loanWithdrawal',{admin:true})
})

router.post('/searchId_loanWithdrawal',(req,res,next)=>{
  memberHelper.getNameEmail(req.body.RegId).then((member)=>{
    console.log(req.body)
    console.log(member)

    memberHelper.getLoanWithdrawal(req.body).then((balance)=>{
      console.log(balance)
      res.render('admin/add_loan',{admin:true,member,balance})
    })

   //res.render('admin/add_loan',{admin:true,member})
   //res.render('admin/just',{admin:true,member})
  })

})

router.post('/add_loan',(req,res,next)=>{
  memberHelper.insertLoan(req.body).then((result)=>{
    console.log(result)
    res.render('admin/add_loan',{admin:true})

  })
})

router.get('/searchId_addLoanInstallment',(req,res,next)=>{

  res.render('admin/searchId_addLoanInstallment',{admin:true})
})
router.post('/searchId_addLoanInstallment',(req,res,next)=>{
  memberHelper.getNameEmail(req.body.RegId).then((member)=>{
    console.log(req.body)
    console.log(member)
    memberHelper.getLoanWithdrawal(req.body).then((balance)=>{
      console.log(balance)
      res.render('admin/add_loanInstallment',{admin:true,member,balance})
    })

  // res.render('admin/add_loanInstallment',{admin:true,member})
   //res.render('admin/just',{admin:true,member})
  })

})

router.post('/add_loanInstallment',(req,res,next)=>{
  memberHelper.insertLoanInstallment(req.body).then((result)=>{
    console.log("hai add_loanInstallment")
    console.log(result[0].amount)

    memberHelper.updateLoanWithdrawal(result[0].amount,req.body).then((result)=>{
      console.log(result)
     // res.render('admin/add_loanInstallment',{admin:true})
    })

    memberHelper.getLoanWithdrawal(req.body).then((balance)=>{
      console.log(balance)
          res.render('admin/loan_balance',{admin:true,balance})
    })
    
  })
    // memberHelper.updateLoanWithdrawal(req.body).then((result)=>{
    //   console.log(result)
    //   console.log("hello")
    //   res.render('admin/add_loanInstallment',{admin:true})
    // })
  })
    
   

  

// router.get('/view_installment',(req,res,next)=>{
//   res.render('admin/view_installment',{admin:true})
// })








router.get('/viewLoan',(req,res,next)=>{

  res.render('admin/viewLoan',{admin:true})
})


module.exports = router;
