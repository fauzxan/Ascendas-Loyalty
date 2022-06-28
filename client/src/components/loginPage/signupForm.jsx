import React, { useContext, useState } from "react";
import { Marginer } from "./marginer";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { AccountContext, loginContext } from "./context";
import { useNavigate } from 'react-router-dom';

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLoggedIn = useContext(loginContext);

  const signup = async()=>{
    console.warn(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method:'post',
      body:JSON.stringify({name, email, password}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result = await result.json();
    console.warn(result);
    setLoggedIn(true);
    navigate("/Home")
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