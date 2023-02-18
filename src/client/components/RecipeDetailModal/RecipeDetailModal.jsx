import React, { useEffect } from 'react'
import { Badge, Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import './RecipeDetailModal.scss';
import { image1 } from '../../../assets';
import { toggleRecipeDetailModal } from '../../../redux/action';
import axios from 'axios';
import { useState } from 'react';

const RecipeDetailModal = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  console.log(data);
  const { isRecipeDetailModalShow, recipe } = useSelector(state => ({ ...state.data }));

  const loadData = async () => {
    const result = await axios.get("http://localhost:8080/recipeDetail/4");

    if (result.data) {
      const newData = result.data.map(item => item.ingredient);
      console.log(newData);
      setData(newData);
    }
  };

  const handleShow = () => {
    dispatch(toggleRecipeDetailModal(true));
  }
  const handleClose = () => {
    dispatch(toggleRecipeDetailModal(false));
  }

  useEffect(() => {
    loadData();

  }, [])

  return (
    <Modal
      size='xl'
      show={isRecipeDetailModalShow}
      onHide={handleClose}
      centered
    >
      <Modal.Header className='recipe-heading-wrapper'>
        <Modal.Title className='recipe-modal-title-wrapper' >
          {recipe.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='recipe-modal-body'>
        <div className='image-container'>
          <img src={recipe.image} width='100%' />
        </div>
        <Container className='description-container' >
          <Row className='recipe-row-wrapper'>
            <Col xs={2}><Badge bg="info" >Meal:</Badge></Col>
            <Col xs={10}><p>{recipe.meal}</p></Col>
          </Row>
          <Row className='recipe-row-wrapper'>
            <Col xs={2}><Badge bg="info">Calories:</Badge></Col>
            <Col xs={10}><p>{recipe.calories}</p></Col>
          </Row>
          <Row className='recipe-row-wrapper'>
            <Col xs={12}><Badge bg="info">Description:</Badge></Col>
            <Col xs={12}><p>{recipe.description}</p></Col>
          </Row>
          <Row className='recipe-row-wrapper'>
            <Col xs={12}><Badge bg="info">Tutorial:</Badge></Col>
            <Col xs={12}><p>{recipe.tutorial}</p></Col>
          </Row>
          {data.length > 0 && data.map((item, index) => 
            <Row className='recipe-row-wrapper' key={index}>
              <Col xs={2}><Badge bg="info">Ingredient {index}:</Badge></Col>
              <Col xs={10}><p>{item.name}</p></Col>
            </Row>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="btn-login" variant="primary">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RecipeDetailModal