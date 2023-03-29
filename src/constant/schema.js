import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string()
    .min(6, 'Username must be at least 6 characters')
    .required('Username is required'),
  
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    // .matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, 'Password must contain at least one uppercase letter and one number')
});

export const registerSchema = yup.object().shape({
  username: yup.string()
    .min(6, 'Username must be at least 6 characters')
    .required('Username is required'),
  email: yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  firstName: yup.string()
    .required('First name is required'),
  lastName: yup.string()
    .required('Last name is required'),
  phone: yup.string()
    .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  gender: yup.string()
    .required('Gender is required'),
  dob: yup.date()
    .max(new Date(Date.now() - 6 * 365 * 24 * 60 * 60 * 1000), 'You must be at least 6 years old')
    .required('Birth date is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    // .matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/, 'Password must contain at least one uppercase letter and one number')
});
