import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema, registerSchema } from '../../../constant/schema';
import { LoginAccount, toggleLoginModal, toggleRegisterModal } from '../../../redux/action';
import "./LoginModal.scss";

const LoginModal = () => {
    const dispatch = useDispatch();
    const { isLoginModalShow, user } = useSelector(state => ({ ...state.data }));
    
    const handleShow = () => {
        dispatch(toggleLoginModal(true));
    }
    const handleClose = () => {
        dispatch(toggleLoginModal(false));
    }

    const handleRegisterClicked = () => {
        handleClose();
        dispatch(toggleRegisterModal(true));
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            console.log(values)
            dispatch(LoginAccount(values))
        },
    });
    
    return (
        <>
            <Modal show={isLoginModalShow} onHide={handleClose} centered>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Header className='heading-wrapper'>
                        <Modal.Title className='login-modal-title-wrapper' >
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="username"
                                placeholder="Enter username"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.username && !!formik.errors.username}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.username}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.password && !!formik.errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <p>Don't have account? Register <Button variant='link' className='link-btn' onClick={handleRegisterClicked}>here</Button> </p> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="btn-login" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default LoginModal