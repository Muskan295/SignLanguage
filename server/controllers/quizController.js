
const quizData = require('../data/quizData');
const getAllQues=(req,res)=>{
    res.json(quizData);
}
const getQuesById=(req,res)=>{
    const id=parseInt(req.params.id);
    const found=quizData.find(a=>a.id===id);
    if(found){
        res.json(found);
    }else{
        res.status(404).json({message:"Ques not found"});
    }
}
module.exports={getAllQues,getQuesById};