import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>COR KLAS</Logo>
          <StyledNav>
            <NavLink href={"/"}>Domov</NavLink>
            <NavLink href={"/vozidla"}>Ponuka vozidiel</NavLink>
            <NavLink href={"/ucet"}>Môj účet</NavLink>
            <NavLink href={"/cart"}>
              Moja objednávka ({cartProducts.length})
            </NavLink>
            <NavLink href={"/kontakt"}>Kontakt</NavLink>
            <NavLink href={"/o-nas"}>O nás</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
