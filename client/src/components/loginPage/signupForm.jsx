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
import { Sform } from "./suform";
import { Form } from "antd";
import Axios from "axios";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  useEffect((navigate) => {
    const au = localStorage.getItem("user");
    if (au) {
      // eslint-disable-next-line
      navigate("/Home");
    }
  }, []);

  const signup = async (values) => {
    const name = values.fullname;
    const email = values.email;
    const password = values.password;
    if (!name || !email || !password) {
      alert("Please complete all fields.");
      return;
    }
    Axios.post("https://loyalty-backend.herokuapp.com/register", {
      name: name,
      email: email,
      password: password,
    })
      .then((result) => {
        localStorage.setItem("user", result.data.result.name);
        localStorage.setItem("email", result.data.result.email);
        localStorage.setItem("tok", result.data.au);
        navigate("/Home");
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <BoxContainer>
      <FormContainer>{<Sform form={form} onFinish={signup} />}</FormContainer>
      <Marginer direction="vertical" margin={1} />
      <SubmitButton type="submit" onClick={() => form.submit()}>
        Signup
      </SubmitButton>
      <Marginer direction="vertical" margin="0em" />
      <MutedLink>
        Already have an account?
        <BoldLink onClick={switchToSignin}>Sign in</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
