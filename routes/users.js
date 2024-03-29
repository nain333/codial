const User = require('../models/user')
const resetToken=require('../models/reset_pass_tokens')
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
router.get('/forgot-password',usersController.forgotPassword)
router.post('/account-recovery',usersController.resetPassword)
router.post('/create',usersController.create)
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),usersController.createSession)
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failiureRedirect:'/users/sign-in'}),usersController.createSession)
router.get('/reset-password/:accessToken',usersController.askNewPassword)
router.post('/reset-password/:accessToken',usersController.setNewPassword)
// router.get('/users/reset-password/successful',usersController.resetSucessful)

module.exports=router;
   