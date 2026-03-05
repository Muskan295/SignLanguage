const express = require('express');
const router=express.Router();
const {getAllModules,getModuleByID}=require('../controllers/modulesController');
router.get('/',getAllModules);
router.get('/:id',getModuleByID);
module.exports=router;