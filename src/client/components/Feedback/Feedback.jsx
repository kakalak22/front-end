import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { feedback } from '../../../assets';
import './Feedback.scss';

const Feedback = () => {
    return (
        <Container className='feedback-container'>
            <Row>
                <Col>
                    <img src={feedback} width='90%' alt="" />
                </Col>
                <Col className='text-wrapper'>
                    <h1>What Customer say about us</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio velit, cupiditate aperiam doloribus iure modi, repudiandae impedit quam, possimus odio porro consectetur nemo perspiciatis laudantium corporis quibusdam vitae similique quos.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default Feedback