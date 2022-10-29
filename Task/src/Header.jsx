import React, { useState } from "react";
import styled from "styled-components";
import { BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";
const Nav = styled.nav`
  padding: 0 20px;
  min-height: 9vh;
  /* background:transparent; */
background: #3b3a3acc;
  backdrop-filter: saturate(180%) blur(10px);  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 25px;
  color: white;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;

  li:nth-child(2) {
    margin: 0px 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Item = styled.li``;

const Link = styled.a`
  color: white;
  font-size:2rem;
  margin-right:2rem
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;

const NavIcon = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  outline: none;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Line = styled.span`
  display: block;
  border-radius: 50px;
  width: 25px;
  height: 3px;
  margin: 5px;
  background-color: #fff;
  transition: width 0.4s ease-in-out;

  :nth-child(2) {
    width: ${props => (props.open ? "40%" : "70%")};
  }
`;

const Overlay = styled.div`
  position: absolute;
  height: ${props => (props.open ? "91vh" : 0)};
  width: 100vw;
  /* background: #trnasparent; */
  background: rgba(0,0,0,0.8);
  backdrop-filter: saturate(180%) blur(10px);
  transition: height 0.4s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`;

const OverlayMenu = styled.ul`
  list-style: none;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);

  li {
    opacity: ${props => (props.open ? 1 : 0)};
    font-size: 25px;
    margin: 50px 0px;
    transition: opacity 0.4s ease-in-out;
  }

  li:nth-child(2) {
    margin: 50px 0px;
  }
`;

const Header = () => {
    const [toggle, toggleNav] = useState(false);
    return (
        <>
            <Nav>
                <Logo>PokeHub</Logo>
                <Menu>
                    <Item>
                        <Link target="#" href="https://www.instagram.com/bablu_bodmash._/">
                            {/* Instagram */}
                            <BsInstagram />
                        </Link>
                    </Item>
                    <Item>
                        <Link target="#" href="https://www.linkedin.com/in/adwaita-raj-modak-5b435a203/">
                            <BsLinkedin />
                        </Link>
                    </Item>
                    <Item>
                        <Link target="#" href="https://github.com/RajAdwaita">
                            <BsGithub />
                        </Link>
                    </Item>
                </Menu>
                <NavIcon onClick={() => toggleNav(!toggle)}>
                    <Line open={toggle} />
                    <Line open={toggle} />
                    <Line open={toggle} />
                </NavIcon>
            </Nav>
            <Overlay open={toggle}>
                <OverlayMenu open={toggle}>
                    <Item>
                        <Link target="#" href="https://www.instagram.com/bablu_bodmash._/">
                            <BsInstagram />
                        </Link>
                    </Item>
                    <Item>
                        <Link target="#" href="https://www.linkedin.com/in/adwaita-raj-modak-5b435a203/">
                            <BsLinkedin />
                        </Link>
                    </Item>
                    <Item>
                        <Link target="#" href="https://github.com/RajAdwaita">
                            <BsGithub />
                        </Link>
                    </Item>
                </OverlayMenu>
            </Overlay>
        </>
    );
};

export default Header;
