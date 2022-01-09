var express = require('express');
var router = express.Router();
var memberHelper = require('../helpers/members_helper')
/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('user/login')
});
// router.get('/user',(req,res,next)=>{
//   let user=req.session.user 
//   console.log(user)
//   res.render('/user/user')
// })
router.post('/login',(req,res,next)=>{

 
  memberHelper.doLogin(req.body).then((response)=>{
    if(response.status){

      req.session.loggedIn = true
      req.session.user = response.user
      console.log(req.session.user)
      res.render('user/user')
    }
    else{
      res.redirect('/')
    }
  })

})
router.get('/logout',(req,res,next)=>{
  // req.session.destroy()
  // console.log(req.session.user)
  res.redirect('/')
})

module.exports = router;
