const alphabetData=require('../data/alphabetData');
const getAlphabets=(req,res)=>{
    res.json(alphabetData);
}
const getAlphabetsByLetter=(req,res)=>{
    const letter=req.params.letter.toUpperCase();
    const found=alphabetData.find(a=>a.letter===letter);
    if(found){
        res.json(found);
    }else{
        res.status(404).json({message:"Letter not found"});
    }
}
module.exports={ getAlphabets,getAlphabetsByLetter}