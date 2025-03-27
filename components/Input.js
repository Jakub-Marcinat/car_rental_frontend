import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 8px;
  background-color: #121212;
  margin-bottom: 5px;
  border: 2px solid #2b2b2b;
  border-radius: 12px;
  box-sizing: border-box;
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
