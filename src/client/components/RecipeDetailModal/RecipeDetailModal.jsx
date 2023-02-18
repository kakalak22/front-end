import React from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import './RecipeDetailModal.scss';
import { image1 } from '../../../assets';
import { toggleRecipeDetailModal } from '../../../redux/action';

const RecipeDetailModal = () => {
  const dispatch = useDispatch();
  const { isRecipeDetailModalShow, recipe } = useSelector(state => ({ ...state.data }));
  console.log(recipe)
  const handleShow = () => {
    dispatch(toggleRecipeDetailModal(true));
  }
  const handleClose = () => {
    dispatch(toggleRecipeDetailModal(false));
  }

  return (
    <Modal
      size='xl'
      // className='recipe-wrapper'
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
            <Col xs={2}><p className='recipe-label'>Meal:</p></Col>
            <Col xs={10}><p>{recipe.meal}</p></Col>
          </Row>
          <Row className='recipe-row-wrapper'>
            <Col xs={2}><p className='recipe-label'>Calories:</p></Col>
            <Col xs={10}><p>{recipe.calories}</p></Col>
          </Row>
          <Row className='recipe-row-wrapper'>
            <Col xs={12}><p className='recipe-label'>Description:</p></Col>
            <Col xs={12}><p>{recipe.description}</p></Col>
          </Row>
          <Row className='recipe-row-wrapper'>
            <Col xs={12}><p className='recipe-label'>Tutorial:</p></Col>
            <Col xs={12}><p>{recipe.tutorial}</p></Col>
          </Row>
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