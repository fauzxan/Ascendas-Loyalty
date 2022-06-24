import React, { useContext } from "react";
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
import { useNavigate } from "react-router-dom"

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const navigate = useNavigate();
  const setLoggedIn = useContext(loginContext);

  const loginHandler = ()=>{
    setLoggedIn(true);
    navigate("/Home");
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <MutedLink href="#">Forgot Password?</MutedLink>
      <Marginer direction="vertical" margin="1em" />
      <SubmitButton onClick={loginHandler}>Login</SubmitButton>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Dont have an Account?
        <BoldLink href="#" onClick={switchToSignup}>
          Sign up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}