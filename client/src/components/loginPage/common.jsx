import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MutedLink = styled.span`
  color: rgba(200, 200, 200, 0.8);
  font-size: 11px;
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  color: rgba(0, 0, 255, 1);
  font-weight: 500;
  font-size: 11px;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;
  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }
  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  padding: 11px 40%;
  width: 100%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgba(0, 0, 0, 1);
  background: linear-gradient(
    58deg,
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 100%
  );
  &:hover {
    filter: brightness(1.03);
  }
`;
