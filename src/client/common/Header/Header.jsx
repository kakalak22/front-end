import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Nav, NavDropdown, Row, Image, OverlayTrigger, Popover } from "react-bootstrap";
import "./Header.scss";
import { logo } from "../../../assets";
import Hamburger from "hamburger-react";
import { useLocation, Outlet } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import OverlayNav from "../OverlayNav";
import { useDispatch, useSelector } from "react-redux";
import { setAccount, toggleLoginModal } from "../../../redux/action";
import PopoverUser from "./PopoverUser";



const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const {user} = useSelector(state => ({ ...state.data }) );
  const dispatch = useDispatch();
  const handleShowLoginModal = () => {
    dispatch(toggleLoginModal(true));
  }
  let location = useLocation();
  const links = [
    { to: "/", name: "Home" },
    { to: "/Link1", name: "All Recipes" },
    { to: "/Link2", name: "All Ingredients" },
    // { to: "/Link3", name: "Link3" },
  ];

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch(setAccount(user));
  },[])

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
              {/* <div className="dropdown-wrapper">
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
              </div> */}
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
            {user?.image ?
              <div >
                <OverlayTrigger
                  trigger="click"
                  placement='bottom-end'
                  overlay={<PopoverUser data={user} />}
                >
                  <Image style={{ borderRadius: '100%', cursor:"pointer" }} width={60} height={60} src={user.image} />
                </OverlayTrigger>
              </div>
              :
              // TODO: Add processing to button
              <Button className="signup-btn" variant="primary" onClick={handleShowLoginModal}>
                Login/Register
              </Button>
            }
          </Col>
        </Row>
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

export default Header;
