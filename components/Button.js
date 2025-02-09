import { primary } from "@/lib/color";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  cursor: pointer;
  border-radius: 5px;
  max-width: 137px;
  text-decoration: none;

  ${(props) =>
    props.white &&
    css`
  background-color: #fff
  color: #000`}
  ${(props) =>
    props.primary &&
    css`
      background-color: ${primary};
      color: #fff;
    `}
    ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
    `};
`;

export const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
