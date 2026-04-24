const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/jobportal");

const User=mongoose.model("User",{name:String,email:String,password:String});
const Job=mongoose.model("Job",{title:String,company:String});

const SECRET="secretkey";

const auth=(req,res,next)=>{
  const token=req.headers.authorization?.split(" ")[1];
  if(!token) return res.status(401).json({msg:"No token"});
  try{
    const decoded=jwt.verify(token,SECRET);
    req.user=decoded;
    next();
  }catch{
    res.status(401).json({msg:"Invalid token"});
  }
};

app.post("/api/auth/register",async(req,res)=>{
  const hash=await bcrypt.hash(req.body.password,10);
  const user=new User({...req.body,password:hash});
  await user.save();
  res.json({msg:"Registered"});
});

app.post("/api/auth/login",async(req,res)=>{
  const user=await User.findOne({email:req.body.email});
  if(!user) return res.json({msg:"No user"});
  const match=await bcrypt.compare(req.body.password,user.password);
  if(!match) return res.json({msg:"Wrong password"});
  const token=jwt.sign({id:user._id},SECRET);
  res.json({token});
});

app.get("/api/jobs",auth,async(req,res)=>{
  const jobs=await Job.find();
  res.json(jobs);
});

app.listen(5000,()=>console.log("Server running"));