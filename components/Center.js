import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 0 auto;
  padding: 0 100px;
`;

export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
