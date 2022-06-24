import React from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom"

const BoxContainer = styled.div`
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0px 0px 2.7px rgba(15, 15, 15, 0.28);
`;

export function LoginBox({onLoggedIn}) {
    const navigate = useNavigate();

    const loginHandler = ()=>{
        onLoggedIn();
        navigate("/Home");
    }

    return (
    <BoxContainer>
        <Button
            variant="primary"
            type="button"
            onClick={loginHandler}
            >
            Login
            </Button>

    </BoxContainer>
    );
}