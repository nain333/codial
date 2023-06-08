const express = require('express');
const router = express.Router();
const usersController=require('../controllers/users_controller');
router.get('/profile',usersController.profile);
router.get('/feeds',usersController.feeds);
router.get('/sign-up',usersController.signup)
router.get('/sign-in',usersController.signin)
router.get('/profile',usersController.profile)
router.get('/sign-out',usersController.signOut)
router.post('/create',usersController.create)
router.post('/create-session',usersController.createSession)

module.exports=router;
   