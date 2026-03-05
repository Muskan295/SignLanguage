const express = require('express');
const router=express.Router();
const {getAlphabets,getAlphabetsByLetter}=require('../controllers/alphabetController');
router.get('/',getAlphabets);
router.get('/:letter',getAlphabetsByLetter);
module.exports=router;