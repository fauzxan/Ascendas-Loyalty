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
import { useNavigate } from "react-router-dom";
import { Lform } from "./lform";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // eslint-disable-next-line
  const navigate = useNavigate();

  useEffect(() => {
    const au = localStorage.getItem("user");
    if (au) {
      // eslint-disable-next-line
      navigate("/Home");
    }
  }, []);

  const login = async () => {
    let result = await fetch("https://loyalty-backend.herokuapp.com/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result.au) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("tok", JSON.stringify(result.au));
      navigate("/Home");
    } else {
      alert("Incorrect credentials");
    }
  };

  const checke = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  return (
    <BoxContainer>
      <FormContainer>
        {<Lform />}
        {/* <Input type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={checke} />
        <Input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={checke} /> */}
      </FormContainer>
      <Marginer direction="vertical" margin={0} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={login}>
        Login
      </SubmitButton>
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
