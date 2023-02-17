import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '../../../constant/schema';
import { toggleLoginModal, toggleRegisterModal } from '../../../redux/action';
import './RegisterModal.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';

const RegisterModal = () => {
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const dispatch = useDispatch();
    const { isRegisterModalShow } = useSelector(state => ({ ...state.data }));
    const handleShow = () => {
        dispatch(toggleLoginModal(true));
        dispatch(toggleRegisterModal(false))
    }
    const handleClose = () => {
        dispatch(toggleLoginModal(false));
    }

    const handleLoginClicked = () => {
        handleShow();
    }

    const handleShowPassword = () => {
        setIsPasswordShow(prevState => !prevState);
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            username: '',
            first_name: '',
            last_name: '',
            dob: '',
            gender: '',
            phone: ''
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            console.log(values);
        },
    });

    return (
        <>
            <Modal show={isRegisterModalShow} onHide={handleClose} centered>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Header className='heading-wrapper'>
                        <Modal.Title className='login-modal-title-wrapper' >
                            Register
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-field-wrapper'>
                            <Form.Group className='mb-3' controlId='formBasicUsername'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Username'
                                    name='username'
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.username && !!formik.errors.username}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formik.errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Button
                                        variant='outline-secondary'
                                        className='btn-show-password'
                                        onClick={handleShowPassword}
                                    >
                                        {isPasswordShow ? <IoEyeSharp /> : <IoEyeOffSharp />}
                                    </Button>
                                    <Form.Control
                                        type={isPasswordShow ? 'text' : 'password'}
                                        placeholder='Password'
                                        name='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        isInvalid={formik.touched.password && !!formik.errors.password}
                                    />
                                </InputGroup>
                                <Form.Control.Feedback type='invalid'>
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className='form-field-wrapper'>
                            <Form.Group className='mb-3' controlId='formBasicFirstName'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='First Name'
                                    name='first_name'
                                    value={formik.values.first_name}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.first_name && !!formik.errors.first_name}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formik.errors.first_name}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicLastName'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Last Name'
                                    name='last_name'
                                    value={formik.values.last_name}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.last_name && !!formik.errors.last_name}
                                    style={{ width: '236px' }}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formik.errors.last_name}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className='form-field-wrapper-long'>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.email && !!formik.errors.email}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formik.errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className='form-field-wrapper-long'>
                            <Form.Group className='mb-3' controlId='formBasicDob'>
                                <Form.Label>Day of Birth</Form.Label>
                                <Form.Control
                                    type='date'
                                    placeholder='Day of Birth'
                                    name='dob'
                                    value={formik.values.dob}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.dob && !!formik.errors.dob}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formik.errors.dob}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className='form-field-wrapper-long'>
                            <Form.Group className='mb-3' controlId='formBasicPhone'>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Phone'
                                    name='phone'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.phone && !!formik.errors.phone}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formik.errors.phone}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className='form-field-wrapper-long'>
                            <Form.Label>Gender</Form.Label>

                            <Form.Group className='mb-3' controlId='formBasicGender'>
                                <Form.Check
                                    inline
                                    type='radio'
                                    placeholder='Gender'
                                    name='gender'
                                    label='Male'
                                    value='male'
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.gender && !!formik.errors.gender}
                                />
                                <Form.Check
                                    inline
                                    type='radio'
                                    placeholder='Gender'
                                    name='gender'
                                    label='Female'
                                    value='female'
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.gender && !!formik.errors.gender}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formik.errors.gender}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>


                        {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Form.Group> */}
                        <p>Already have account? Login <Button variant='link' className='link-btn' onClick={handleLoginClicked}>here</Button> </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button className='btn-login' variant='primary' type='submit'>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default RegisterModal