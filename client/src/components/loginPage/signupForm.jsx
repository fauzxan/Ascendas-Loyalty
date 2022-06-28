import React, { useContext, useState, useEffect } from "react";
import { Marginer } from "./marginer";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { AccountContext } from "./context";
import { useNavigate } from 'react-router-dom';

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect((navigate)=>{
    const au = localStorage.getItem('user');
    if(au) {
      // eslint-disable-next-line
      navigate("/Home");
    }
    
  },[])

  const signup = async()=>{
    let result = await fetch("http://localhost:5000/register", {
      method:'post',
      body:JSON.stringify({name, email, password}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("tok", JSON.stringify(result.au));
    navigate("/Home");
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" 
        value={name} onChange={(e)=>setName(e.target.value)}/>
        <Input type="email" placeholder="Email" 
        value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Input type="password" placeholder="Password" 
        value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={signup}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}