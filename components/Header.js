import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";

const StyledHeader = styled.header`
  background-color: #030303;
  position: relative;
  top: 0;
  z-index: 20;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 40px;

  @media (max-width: 768px) {
    padding: 15px 20px;
  }
`;

const Logo = styled(Link)`
  font-size: 1.4rem;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  letter-spacing: 1px;
  white-space: nowrap;
`;

const NavContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    flex-direction: column;
    background-color: #151515;
    width: 100%;
    padding: 20px;
    gap: 15px;
    transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-200%)")};
    opacity: ${({ open }) => (open ? 1 : 0)};
    transition: all 0.3s ease-in-out;
    pointer-events: ${({ open }) => (open ? "auto" : "none")};
    align-items: center;
  }
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    color: #fff;
  }
`;

const Hamburger = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 30;

  @media (max-width: 768px) {
    display: block;
  }

  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <StyledHeader>
      <Wrapper>
        <Logo href="/">COR KLAS</Logo>

        <NavContainer>
          <Nav open={menuOpen}>
            <NavLink href="/">Domov</NavLink>
            <NavLink href="/ponuka-vozidiel">Ponuka vozidiel</NavLink>
            <NavLink href="/prihlasenie">Prihlásiť sa</NavLink>
            <NavLink href="/FAQ">FAQ</NavLink>
            <NavLink href="/#kontakt">Kontakt</NavLink>
            <NavLink href="/o-nas">O nás</NavLink>
          </Nav>
        </NavContainer>

        <Hamburger onClick={() => setMenuOpen((prev) => !prev)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            )}
          </svg>
        </Hamburger>
      </Wrapper>
    </StyledHeader>
  );
}
