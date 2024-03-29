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
import { Sform } from "./suform";
import { Form } from "antd";
import Axios from "axios";
import { Ldots } from "./dots";
import { bh } from "../config";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const name = values.fullname;
    const email = values.email;
    const password = values.password;
    if (!name || !email || !password) {
      alert("Please complete all fields.");
      setLoading(false);
      return;
    }
    Axios.post(bh + "/register", {
      name: name,
      email: email,
      password: password,
    })
      .then((result) => {
        if (result.data.au) {
          localStorage.setItem("user", result.data.r.name);
          localStorage.setItem("email", result.data.r.email);
          localStorage.setItem("tok", result.data.au);
          navigate("/Home");
        } else {
          alert("Account with email already exists");
          setLoading(false);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line
        if (err.response.status == 403) {
          alert("Account with email already exists");
          setLoading(false);
        }
        console.warn(err);
      });
  };

  return (
    <BoxContainer>
      <FormContainer>{<Sform form={form} onFinish={signup} />}</FormContainer>
      <Marginer direction="vertical" margin={1} />
      {!loading && (
        <SubmitButton
          id="signup_button"
          type="submit"
          onClick={() => form.submit()}
        >
          Signup
        </SubmitButton>
      )}
      {loading && <Ldots></Ldots>}
      <Marginer direction="vertical" margin="0em" />
      <MutedLink>
        Already have an account?
        <BoldLink id="signup_to_login" onClick={switchToSignin}>
          Sign in
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
