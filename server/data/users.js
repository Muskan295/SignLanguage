const fs=require('fs');
const path=require('path');

const filePath=path.join(__dirname,'users.json');

const loadUsers=()=>{
    try{
        if(fs.existsSync(filePath)){
            const data=fs.readFileSync(filePath,'utf-8');
            return JSON.parse(data);
        }
    }catch(e){
        console.error('Error loading users:',e.message);
    }
    return [];
}

const saveUsers=(users)=>{
    try{
        fs.writeFileSync(filePath,JSON.stringify(users,null,2),'utf-8');
    }catch(e){
        console.error('Error saving users:',e.message);
    }
}

let users=loadUsers();

module.exports={users,saveUsers};