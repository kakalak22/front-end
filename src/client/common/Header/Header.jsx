import React, { useState } from "react";
import { Button, Col, Container, Nav, NavDropdown, Row } from "react-bootstrap";
import "./Header.scss";
import { logo } from "../../../assets";
import Hamburger from "hamburger-react";
import { useLocation, Outlet } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import OverlayNav from "../OverlayNav";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);
  let location = useLocation();
  const links = [
    { to: "/", name: "Home" },
    { to: "/Link1", name: "Link1" },
    { to: "/Link2", name: "Link2" },
    { to: "/Link3", name: "Link3" },
  ];

  return (
    <React.Fragment>
      <OverlayNav isOpen={isOpen} />
      <Container>
        <Row className="header-wrapper">
          <Col className="logo-wrapper" xs={8} xl={3}>
            <img className="logo" src={logo} />
          </Col>
          <Col xs={1} xl={6}>
            <Nav className="nav-wrapper">
              {links.map((link, index) => (
                <Nav.Link
                  // onClick={() => handleNavClick(link.to)}
                  className={
                    link.to === location.pathname
                      ? "nav-link active"
                      : "nav-link"
                  }
                  key={index}
                  href={link.to}
                >
                  {" "}
                  {link.name}{" "}
                </Nav.Link>
              ))}
              <div className="dropdown-wrapper">
                <NavDropdown title={"Dropdown"} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
                <MdKeyboardArrowDown className={"dropdown-arrow"} />
              </div>
            </Nav>
          </Col>
          <Col className="hamburger-button-wrapper" xs={3}>
            <div className="hamburger-button">
              <Hamburger
                size={30}
                toggled={isOpen}
                toggle={setOpen}
                color={"#febd2e"}
                rounded
              />
            </div>
            <Button className="signup-btn" variant="primary">
              Login
            </Button>
          </Col>
        </Row>
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

export default Header;
