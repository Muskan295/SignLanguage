const express = require('express');
const router=express.Router();
const {getAllWords,getWords}=require('../controllers/wordsController');
router.get('/',getAllWords);
router.get('/:word',getWords);
module.exports=router;