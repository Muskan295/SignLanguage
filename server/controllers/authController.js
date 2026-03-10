const {users,saveUsers}=require('../data/users');
const signup=(req,res)=>{
    const {fullName,email,age,password,userType}=req.body;
    if(users.find(user=>user.email===email)){
        return res.status(400).json({error:"User already exists"});
    }
    const newUser={id:Date.now(),fullName,email,age,password,userType};
    users.push(newUser);
    saveUsers(users);
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
    saveUsers(users);
    res.status(200).json({message:"Password changed successfully"});
}

const getProfile=(req,res)=>{
    const {email}=req.params;
    const user=users.find(u=>u.email===email);
    if(!user){
        return res.status(404).json({error:"User not found"});
    }
    const {password,...userWithoutPassword}=user;
    res.status(200).json({user:userWithoutPassword});
}

const updateProfile=(req,res)=>{
    const {email}=req.params;
    const {fullName,age,userType}=req.body;
    const user=users.find(u=>u.email===email);
    if(!user){
        return res.status(404).json({error:"User not found"});
    }
    if(fullName) user.fullName=fullName;
    if(age) user.age=age;
    if(userType) user.userType=userType;
    saveUsers(users);
    const {password,...userWithoutPassword}=user;
    res.status(200).json({message:"Profile updated successfully",user:userWithoutPassword});
}

const deleteAccount=(req,res)=>{
    const {email}=req.params;
    const {password}=req.body;
    const userIndex=users.findIndex(u=>u.email===email && u.password===password);
    if(userIndex===-1){
        return res.status(400).json({error:"Invalid email or password"});
    }
    users.splice(userIndex,1);
    saveUsers(users);
    res.status(200).json({message:"Account deleted successfully"});
}

module.exports={signup,login,changePassword,getProfile,updateProfile,deleteAccount};