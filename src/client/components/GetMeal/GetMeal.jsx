import { useFormik } from "formik";
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import "./GetMeal.scss";

const GetMeal = () => {


  const formik = useFormik({
    initialValues:{
      calories:'',
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  
  const handleSelectCalories = (e) =>{
    formik.setFieldValue('calories', e.target.value)
  }

  return <Container>
    <Form onSubmit={formik.handleSubmit}>
    <Form.Group className='mb-3' controlId='formBasicCalories'>
      <Form.Select onChange={handleSelectCalories} aria-label="Default select example" name="calories">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
      </Form.Group>
      <Button className="btn-login" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </Container>;
};

export default GetMeal;
