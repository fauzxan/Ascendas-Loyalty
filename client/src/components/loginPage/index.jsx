import React, { useState } from "react";
import styled from "styled-components";
// import {useNavigate} from "react-router-dom"
import { motion } from "framer-motion";

const BoxContainer = styled.div`
  width: 280px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0px 0px 2.7px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 255px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  position: absolute;
  width: 160%;
  height: 550px;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -290px;
  left: -70px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    58deg,
    rgba(0, 0, 0, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const HeaderText = styled.h2`
  font-weight: 600;
  color: #fff;
  z-index: 10;
  margin: 0;
  font-size: 30px;
  line-height: 1.24;
`;

const SmallText = styled.h5`
  font-weight: 500;
  color: #fff;
  z-index: 10;
  margin: 0;
  font-size: 12px;
  line-height: 1.24;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1.7em;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function LoginBox({onLoggedIn}) {
    // const navigate = useNavigate();
    const [isExpanded, setExpanded] = useState(false);

    const playExpandingEffect = () => {
        setExpanded(true);

        setTimeout(() => {
          setExpanded(false);
        }, expandingTransition.duration * 1000 - 1500);
    };

    // const loginHandler = ()=>{
    //     onLoggedIn();
    //     navigate("/Home");
    // }

    return (
        <BoxContainer>
          <TopContainer>
            <BackDrop
              variants={backdropVariants}
              transition={expandingTransition}
              initial={false}
              animate={isExpanded ? "expanded" : "collapsed"}
            />
            <HeaderContainer>
              <HeaderText>Welcome</HeaderText>
              <HeaderText>Back</HeaderText>
            </HeaderContainer>
            <SmallText>Please Sign In To continue</SmallText>
          </TopContainer>
          <InnerContainer>
            <span onClick={playExpandingEffect}>Sign Up</span>
          </InnerContainer>
        </BoxContainer>
      );
}