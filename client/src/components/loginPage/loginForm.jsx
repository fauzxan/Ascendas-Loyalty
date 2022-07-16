import React, { useContext, useEffect } from "react";
import { Marginer } from "./marginer";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  MutedLink,
  SubmitButton,
} from "./common";
import { AccountContext } from "./context";
import { useNavigate } from "react-router-dom";
import { Lform } from "./lform";
import { Form } from "antd";
import Axios from "axios";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const au = localStorage.getItem("user");
    if (au) {
      navigate("/Home");
    }
  }, []);

  const login = async (values) => {
    const email = values.email;
    const password = values.password;
    if (!email || !password) {
      alert("Please key in credentials");
      return;
    }
    Axios.post("https://loyalty-backend.herokuapp.com/login", {
      email: email,
      password: password,
    })
      .then((result) => {
        if (result.data.au) {
          console.log(result.data.user.name);
          localStorage.setItem("user", result.data.user.name);
          localStorage.setItem("tok", result.data.au);
          navigate("/Home");
        } else {
          alert("Incorrect credentials");
        }
      })
      .catch((err) => {
        alert("Incorrect credentials");
      });
  };

  return (
    <BoxContainer>
      <FormContainer>{<Lform form={form} onFinish={login} />}</FormContainer>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={() => form.submit()}>
        Login
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink>
        Dont have an Account?{" "}
        <BoldLink onClick={switchToSignup}>Sign up</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
