import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
                                                                                                                                       
import {  Form  } from "antd";
const { Item, useForm } = Form;
function Registration() {
  const navigate = useNavigate()
  const [value,setValue] =useState({
    firstname:"",
    lastname:"",
    email:"",
    password:""
})


   const handleSubmit =async()=>{
     const registrationRes = await axios.post(
      "http://localhost:9000/api/login/adduser ",
      {
        firstname:value.firstname,
        lastname:value.lastname,
        email:value. email,
        password: value.password,
      }
    );
    console.log(value);
    console.log(registrationRes.data.id)
    if (registrationRes?.data?.id) {
      // getAllUserList();
      // console.
      navigate("/");
    } else {
      alert("ERROR")
    }
   }


  return (
    <>
    <div className='container' style={{
     display: "flex",
     backgroundcolor: "aqua",
     alignitems: "center",
    
    }} >
      <div className='form-controller' style={{weigth:"60%",margin:"auto"}}>
        <div className='form' action='' 
         style={{backgroundColor: "white", padding:"20px"}} >
       
          <h2>SIGN UP</h2>
          <span><h3>please fill your information below</h3></span>
          <br/>
          
           <div className='mb-8' style={{marginBottom: "20px"}}>
             <label htmlFor='firstname'><strong>FIRST NAME</strong></label>
             <input type='firstname' name='firstname' style={{marginLeft:"20px",borderRadius: "4px",
               borderStyle: "ridge"}}
             onChange={(e)=>{setValue({...value,firstname:e.target.value})}}/>
           </div>

           <div className='mb-3' style={{marginBottom: "20px"}}>
             <label htmlFor='lastname'><strong>LAST NAME</strong></label>
             <input type='lastname'  name='lastname' style={{marginLeft:"20px",borderRadius: "4px",
               borderStyle: "ridge"}}
             onChange={(e)=>{setValue({...value,lastname:e.target.value})}}/>
           </div>

           <div className='mb-3' style={{marginBottom: "20px"}}>
             <label htmlFor='email'><strong>EMAIL</strong></label>
             <input type='email' placeholder='enter email' name='email' style={{marginLeft:"20px",borderRadius: "4px",
               borderStyle: "ridge"}}
             onChange={(e)=>{setValue({...value,email:e.target.value})}}/>
           </div>

           <div className='mb-3' style={{marginBottom: "20px"}}>
             <label htmlFor='password'><strong>PASSWORD</strong></label>
             <input type='password' placeholder='enter password'name='password' style={{marginLeft:"20px",borderRadius: "4px",
               borderStyle: "ridge"}}
             onChange={(e)=>{setValue({...value,password:e.target.value})}}/>
           </div>
             
             <button onClick={handleSubmit} style={{width:"100%",backgroundColor:"blue",color:"white",textAlign:"center",cursor:"pointer",height:"30px",borderRadius:"9px"}}>SUBMIT</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Registration
