import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Button, Form, Image, InputGroup, Modal, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginSchema } from '../../../constant/schema';
import { registerAccount, toggleLoginModal, toggleRegisterModal } from '../../../redux/action';
import './RegisterModal.scss';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import { v4 as uuidv4 } from "uuid";
import { storage } from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';

const avaDefaultUrl = "https://anhdep123.com/wp-content/uploads/2021/05/anh-avatar-trang.jpg";

const RegisterModal = () => {
    const [isPasswordShow, setIsPasswordShow ] = useState(false);
    const [imageUrl, setImageUrl] = useState(avaDefaultUrl);
    const dispatch = useDispatch();
    const { isRegisterModalShow, user, registerFailed } = useSelector(state => ({ ...state.data }));
    // const {setFieldValue} = useFormik();
    console.log(registerFailed)

    const handleRegister = async (body) => {
        const data = await axios.post(`http://localhost:8080/accounts/`, body);
        if(data?.status===201){
            console.log('success')
        }
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            username: '',
            firstName: '',
            lastName: '',
            dob: '',
            gender: '',
            phone: '',
            image: imageUrl,
        },
        validationSchema: loginSchema,
        onSubmit: values => {
            console.log(values);
            const account = { ...values, role: 'User', status: 'Active' }
            // handleRegister(account)
            dispatch(registerAccount(account));
        },
    });

    const uploadImage = (file) => {
        const imageRef = ref(storage, `images/${file.name + uuidv4()}`);
        uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => {
                    setImageUrl(url);
                    formik.setFieldValue('image', url)

                })
                .catch((error) => console.log(error));
        });
    };

    const handleShow = () => {
        dispatch(toggleLoginModal(true));
        dispatch(toggleRegisterModal(false))
    }

    const handleClose = () => {
        dispatch(toggleRegisterModal(false));
    }

    const handleLoginClicked = () => {
        handleShow();
    }

    const handleShowPassword = () => {
        setIsPasswordShow(prevState => !prevState);
    }

    const handleInputImage = (e) => {
        uploadImage(e.target.files[0]);
    }

    useEffect(()=>{
        handleClose()
    },[user])

    return (
        <>
            <Modal show={isRegisterModalShow} onHide={handleClose} centered >
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Header className='heading-wrapper'>
                        <Modal.Title className='login-modal-title-wrapper' >
                            Register
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='form-field-wrapper-long'>
                            <Form.Group className='mb-3' controlId='formBasicUsername'>
                                <Form.Label>Username <span style={{ color: 'red' }}>*</span> </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Username'
                                    name='username'
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.username && !!formik.errors.username}
                                />
                                <Form.Control.Feedback type='invalid' >
                                    {formik.errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>


                        </div>
                        <div className="form-field-wrapper-long">
                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                                <Form.Label>Password <span style={{ color: 'red' }}>*</span> </Form.Label>
                                <InputGroup>
                                    <Button
                                        variant={!formik?.errors?.password ? 'outline-secondary' : 'outline-danger'}
                                        className={!formik?.errors?.password ? 'btn-show-password' : 'btn-show-password-error'}
                                        onClick={handleShowPassword}
                                    >
                                        {isPasswordShow ? <IoEyeSharp /> : <IoEyeOffSharp />}
                                    </Button>
                                    <Form.Control
                                        className='password-input'
                                        type={isPasswordShow ? 'text' : 'password'}
                                        placeholder='Password'
                                        name='password'
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        isInvalid={formik.touched.password && !!formik.errors.password}
                                    />
                                    <Form.Control.Feedback type='invalid' >
                                        {formik.errors.password}
                                    </Form.Control.Feedback>

                                </InputGroup>
                            </Form.Group>
                        </div>
                        <div className='form-field-wrapper'>
                            <Form.Group className='mb-3' controlId='formBasicFirstName'>
                                <Form.Label>First Name <span style={{ color: 'red' }}>*</span> </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='First Name'
                                    name='firstName'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formik.errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className='mb-3' controlId='formBasicLastName'>
                                <Form.Label>Last Name <span style={{ color: 'red' }}>*</span> </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Last Name'
                                    name='lastName'
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                                    style={{ width: '236px' }}
                                />
                                <Form.Control.Feedback type='invalid'>
                                    {formik.errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className='form-field-wrapper-long'>
                            <Form.Group className='mb-3' controlId='formBasicEmail'>
                                <Form.Label>Email address <span style={{ color: 'red' }}>*</span> </Form.Label>
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
                                <Form.Label>Day of Birth <span style={{ color: 'red' }}>*</span> </Form.Label>
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
                                <Form.Label>Phone <span style={{ color: 'red' }}>*</span> </Form.Label>
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
                            <Form.Label>Gender <span style={{ color: 'red' }}>*</span> </Form.Label>

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
                            <div className="form-field-wrapper-long" style={{ padding: 0, marginBottom: 10 }}>
                                <Form.Label>Profile picture </Form.Label>
                                <Form.Group controlId="formFile" className="mb-3" style={{ width: '100%' }}>
                                    <Form.Control type="file" name="file" onChange={handleInputImage} />
                                </Form.Group>
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                    <Image src={imageUrl} width={150} height={150} />
                                </div>
                            </div>
                        </div>


                        {/* <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                            <Form.Check type='checkbox' label='Check me out' />
                        </Fo rm.Group> */}
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