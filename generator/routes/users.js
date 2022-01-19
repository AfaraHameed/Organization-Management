var express = require('express');
var router = express.Router();
var memberHelper = require('../helpers/members_helper')
var userHelper = require('../helpers/user_helper')
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   const user = req.session
//  res.render('user/login')
// });

router.get('/', function(req, res, next) {


  if(req.session.loggedIn){
    console.log(req.session.user)
    let user = req.session.user
    res.render('user/user',{user})
  }
  else{
    res.render('user/login',{"loginErr":req.session.loginErr})
    req.session.loginErr=false
    }
 
});
// router.get('/user',(req,res,next)=>{
//   let user=req.session.user 
//   console.log(user)
//   res.render('/user/user')
// })
router.post('/login',(req,res,next)=>{

 
  memberHelper.doLogin(req.body).then((response)=>{
    console.log(response.user)
    if(response.status){

      req.session.loggedIn = true
      req.session.user = response.user
      console.log(req.session.user)
      let user = req.session.user
      res.render('user/user',{user})
    }
    else{
      req.session.loginErr ="invalid user name or password"
      res.redirect('/',{"loginErr":req.session.loginErr})
     
    }
  })

})


router.get('/logout',(req,res,next)=>{
  //  req.session.destroy()
  // console.log(req.session.user)
  res.redirect('/')
})

const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }
  else{
    res.redirect('/')
  }
}

router.get('/profile',verifyLogin,(req,res,next)=>{
  console.log(req.session.user.regId)
  userHelper.getProfile(req.session.user.regId).then((result)=>{
     console.log(result)
     res.render('user/profile',{result})
  })
})

module.exports = router;
