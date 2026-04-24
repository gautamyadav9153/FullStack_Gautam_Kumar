import React, { useState } from "react";
import API from "../api";
import { setToken } from "../utils/auth";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin=async()=>{
    const res=await API.post("/auth/login",{email,password});
    setToken(res.data.token);
    alert("Login Successful");
  }

  return (
    <div>
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}