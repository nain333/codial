const express = require('express')
const router = express.Router()
const passport = require('passport')
const postApi=require('../../../controllers/api/v2/post_api')
router.get('/',postApi.index)
module.exports=router