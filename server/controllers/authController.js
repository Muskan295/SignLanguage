const users=require('../data/users');
const signup=(req,res)=>{
    const {fullName,email,age,password,userType}=req.body;
    if(users.find(user=>user.email===email)){
        return res.status(400).json({error:"User already exists"});
    }
    const newUser={id:Date.now(),fullName,email,age,password,userType};
    users.push(newUser);
    res.status(201).json({message:"User registered successfully",user:newUser});
}

const login=(req,res)=>{
    const {email,password}=req.body;
    const user=users.find(u=>u.email===email && u.password===password);
    if(!user){
        return res.status(400).json({error:"Invalid email or password"});
    }
    res.status(200).json({message:"Login successful",user});
}

const changePassword=(req,res)=>{
    const{email,oldPassword,newPassword}=req.body;
    const user=users.find(u=>u.email===email && u.password===oldPassword);
    if(!user){
        return res.status(400).json({error:"Invalid email or password"});
    }
    user.password=newPassword;
    res.status(200).json({message:"Password changed successfully"});
}
module.exports={signup,login,changePassword};