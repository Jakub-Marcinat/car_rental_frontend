import Link from "next/link";
import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  font-size: 1.4rem;
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.5fr;
  align-items: center;
  padding: 15px 80px;
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
    </StyledHeader>
  );
}
