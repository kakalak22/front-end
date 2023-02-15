import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '../../../constant/schema';
import { toggleLoginModal, toggleRegisterModal } from '../../../redux/action';
import "./LoginModal.scss";

const LoginModal = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const { isLoginModalShow } = useSelector(state => ({ ...state.data }));
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
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            console.log(values);
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
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.email && !!formik.errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
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