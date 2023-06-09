const express = require('express');
const passport = require('passport')
const router = express.Router();
const usersController=require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update) 
router.get('/feeds',usersController.feeds);
router.get('/sign-up',usersController.signup)
router.get('/sign-in',usersController.signin)
router.get('/sign-out',usersController.distroySession)
router.post('/create',usersController.create)
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),usersController.createSession)


module.exports=router;
   