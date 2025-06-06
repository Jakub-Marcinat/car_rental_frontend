import { corklasYellow } from "@/lib/color";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 12px 40px;
  cursor: pointer;
  border-radius: 24px;

  text-decoration: none;

  ${(props) =>
    props.white &&
    css`
  background-color: #fff
  width: 100%;
  color: #000`}
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
      margin-top: 10px;
    `}
  ${(props) =>
    props.primary &&
    css`
      background-color: ${corklasYellow};
      color: #000;
    `}
    ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
    `};
  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
`;

export const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
