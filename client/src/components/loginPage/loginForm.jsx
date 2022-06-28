import React, { useContext, useEffect } from "react";
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
  // eslint-disable-next-line
  const navigate = useNavigate();

  useEffect((navigate)=>{
    const au = localStorage.getItem('user');
    if(au) {
      // eslint-disable-next-line
      navigate("/Home");
    }
  },[])

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit">Login</SubmitButton>
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