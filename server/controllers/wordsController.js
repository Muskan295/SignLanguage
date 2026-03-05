
const wordsData=require('../data/wordsData');
const getAllWords=(req,res)=>{
    res.json(wordsData);
}
const getWords=(req,res)=>{
    const word=req.params.word.toLowerCase();
    const found=wordsData.find(a=>a.word.toLowerCase()===word);
    if(found){
        res.json(found);
    }else{
        res.status(404).json({message:"Word not found"});
    }
}
module.exports={getAllWords,getWords};