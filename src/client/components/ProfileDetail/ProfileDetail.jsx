import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import { registerSchema } from '../../../constant/schema';
import './ProfileDetail.scss';
import { v4 as uuidv4 } from "uuid";
import { storage } from '../../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount } from '../../../redux/action';
import axios from 'axios';
import { toast } from 'react-toastify';


const avaDefaultUrl = "https://anhdep123.com/wp-content/uploads/2021/05/anh-avatar-trang.jpg";

const ProfileDetail = () => {
    const [imageUrl, setImageUrl] = useState(avaDefaultUrl);
    const [isEditMode, setIsEditMode] = useState(false)
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const { user } = useSelector(state => ({ ...state.data }));
    const dispatch = useDispatch();


    const handleUpdate = async (body) => {
        const res = await axios.put(`http://localhost:8080/accounts/${user.id}`, body);
        dispatch(setAccount(res.data))
        if(res.data){
            toast.success('Profile updated');
            setIsEditMode(false);
        }
    }

    const handleShowPassword = () => {
        setIsPasswordShow(prevState => !prevState);
    }

    const handleInputImage = (e) => {
        uploadImage(e.target.files[0]);
    }

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
        validationSchema: registerSchema,
        onSubmit: values => {
            handleUpdate(values);
        },
    });

    useEffect(() => {
        formik.setValues(user);
        if (user.image) {
            setImageUrl(user.image)
        }
    }, [user])

    return (
        <Container className='profile-detail-wrapper'>
            <Form onSubmit={formik.handleSubmit}>
                <div className='form-field-wrapper-long'>
                    <Form.Group className='mb-3' controlId='formBasicUsername'>
                        <Form.Label>Username <span style={{ color: 'red' }}>*</span> </Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Username'
                            name='username'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            disabled={!isEditMode}
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
                                disabled={!isEditMode}
                                isInvalid={formik.touched.password && !!formik.errors.password}
                            />
                            <Form.Control.Feedback type='invalid' >
                                {formik.errors.password}
                            </Form.Control.Feedback>

                        </InputGroup>
                    </Form.Group>
                </div>
                <div className='form-field-wrapper'>
                    <Form.Group style={{ width: '50%' }} className='mb-3' controlId='formBasicFirstName'>
                        <Form.Label>First Name <span style={{ color: 'red' }}>*</span> </Form.Label>
                        <Form.Control

                            type='text'
                            placeholder='First Name'
                            name='firstName'
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            disabled={!isEditMode}
                            isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {formik.errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group style={{ width: '50%' }} className='mb-3' controlId='formBasicLastName'>
                        <Form.Label>Last Name <span style={{ color: 'red' }}>*</span> </Form.Label>
                        <Form.Control

                            type='text'
                            placeholder='Last Name'
                            name='lastName'
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                            disabled={!isEditMode}

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
                            disabled={!isEditMode}
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
                            disabled={!isEditMode}
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
                            disabled={!isEditMode}
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
                            checked={user.gender === 'male' ? true : false}
                            id='male'
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
                            disabled={!isEditMode}
                            checked={user.gender === 'male' ? false : true}
                            id='female'
                        />
                        <Form.Control.Feedback type='invalid'>
                            {formik.errors.gender}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <div className="form-field-wrapper-long" style={{ padding: 0, marginBottom: 10 }}>
                        <Form.Label>Profile picture </Form.Label>
                        {isEditMode && <Form.Group controlId="formFile" className="mb-3" style={{ width: '100%' }}>
                            <Form.Control type="file" name="file" onChange={handleInputImage} />
                        </Form.Group>}
                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img src={imageUrl} width={150} height={150} />
                        </div>
                    </div>
                </div>
                {!isEditMode &&
                    <Container style={{display:'flex', gap: 10}}>
                        <Button onClick={() => setIsEditMode(true)}>Edit</Button>
                    </Container>
                }
                {
                    isEditMode &&
                    <Container style={{display:'flex', gap: 10}}>
                        <Button variant='primary' type='submit'>Update Profile</Button>
                        <Button variant='warning' onClick={()=>setIsEditMode(false)}>Cancel</Button>
                    </Container>
                }
            </Form>
        </Container>
    )
}

export default ProfileDetail