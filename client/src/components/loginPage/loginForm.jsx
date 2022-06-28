import React, { useContext, useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom"

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line
  const navigate = useNavigate();

  useEffect(()=>{
    const au = localStorage.getItem('user');
    if(au) {
      // eslint-disable-next-line
      navigate("/Home");
    }
  },[]);

  const login = async ()=>{
    let result = await fetch("http://localhost:5000/login", {
      method:'post',
      body:JSON.stringify({email, password}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result = await result.json();
    console.warn(result);
    if (result.name) {
      localStorage.setItem('user', JSON.stringify(result));
      navigate("/Home")
    } else {
      alert("Incorrect credentials")
    }
  }
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        login()
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" 
        value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" 
        value = {password} onChange={(e)=>setPassword(e.target.value)}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onSubmit={login}>Login</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Dont have an Account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}