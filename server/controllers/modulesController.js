
const moduleData = require('../data/modulesData');
const getAllModules=(req,res)=>{
    res.json(moduleData);
}
const getModuleByID=(req,res)=>{
    const id=parseInt(req.params.id);
    const found=moduleData.find(a=>a.id===id);
    if(found){
        res.json(found);
    }else{
        res.status(404).json({error:"Module not found"});
    }
}
module.exports={getAllModules,getModuleByID};