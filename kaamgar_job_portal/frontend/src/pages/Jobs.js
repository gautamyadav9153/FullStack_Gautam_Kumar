import React,{useEffect,useState} from "react";
import API from "../api";

export default function Jobs(){
  const [jobs,setJobs]=useState([]);

  useEffect(()=>{
    API.get("/jobs").then(res=>setJobs(res.data));
  },[]);

  return (
    <div>
      {jobs.map(job=>(
        <div key={job._id}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
        </div>
      ))}
    </div>
  )
}