var express = require('express');
var router = express.Router();
var authController=require('../controllers/authController');

/* GET home page. */
router.get('/', authController.login_get)

//login post
router.post('/',authController.login_post);


router.get('/signup',authController.signup_get);

//sinu post 
router.post('/signup',authController.signup_post)

router.get('/logout',authController.logout_get);

module.exports = router;
