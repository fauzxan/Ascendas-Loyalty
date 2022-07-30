import React, { useContext, useEffect, useState } from "react";
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
import { Ldots } from "./dots";
import { bh } from "../config";
export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const au = localStorage.getItem("user");
    if (au) {
      navigate("/Home");
    }
    // eslint-disable-next-line
  }, []);

  const login = async (values) => {
    setLoading(true);
    const email = values.email;
    const password = values.password;
    if (!email || !password) {
      alert("Please key in credentials");
      setLoading(false);
      return;
    }
    Axios.post(bh + "/login", {
      email: email,
      password: password,
    })
      .then((result) => {
        if (result.data.au) {
          localStorage.setItem("user", result.data.u.name);
          localStorage.setItem("email", result.data.u.email);
          localStorage.setItem("tok", result.data.au);
          navigate("/Home");
        } else {
          alert("Incorrect credentials");
        }
        setLoading(false);
      })
      .catch((err) => {
        alert("Incorrect credentials");
        setLoading(false);
      });
  };

  return (
    <BoxContainer>
      <FormContainer>{<Lform form={form} onFinish={login} />}</FormContainer>
      <Marginer direction="vertical" margin="1.6em" />
      {!loading && (
        <SubmitButton id="login_button" type="submit" onClick={() => form.submit()}>
          Login
        </SubmitButton>
      )}
      {loading && <Ldots></Ldots>}
      <Marginer direction="vertical" margin="1em" />
      <MutedLink>
        Dont have an Account?{" "}
        <BoldLink id="login_to_signup" onClick={switchToSignup}>Sign up</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}

