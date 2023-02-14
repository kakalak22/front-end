import React from 'react'
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <Container>
        <Row>
            <Col>
                <Stack className='copyright-wrapper' direction="vertical">
                    <h5>Copyright 11-2-2023</h5>
                </Stack>
            </Col>
        </Row>
        <Outlet/>
    </Container>
  )
}

export default Footer