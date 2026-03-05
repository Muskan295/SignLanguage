const express = require('express');
const router=express.Router();
const {getAllQues,getQuesById}=require('../controllers/quizController');
router.get('/',getAllQues);
router.get('/:id',getQuesById);
module.exports=router;