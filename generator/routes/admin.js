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

module.exports = router;
