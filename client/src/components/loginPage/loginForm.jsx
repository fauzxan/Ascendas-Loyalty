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
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={loginHandler}>Login</SubmitButton>
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