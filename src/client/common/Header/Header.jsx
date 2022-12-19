import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Header.scss";
import { logo } from "../../../assets";
import Hamburger from "hamburger-react";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Container>
      <Row className="header-wrapper">
        <Col className="logo-wrapper" xs={9}>
          <img className="logo" src={logo} />
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
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
