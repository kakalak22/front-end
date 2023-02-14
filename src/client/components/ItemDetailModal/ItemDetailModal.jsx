import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleItemModal } from '../../../redux/action';
import postReducer from '../../../redux/reducer';
import rootReducer from '../../../redux/root-reducer';

const ItemDetailModal = () => {
    const dispatch = useDispatch();
    const { isItemDetailModalShow } = useSelector(state=>({...state.data}));
    const handleShow = () =>{
        dispatch(toggleItemModal(true));
    }
    const handleClose = () =>{
        dispatch(toggleItemModal(false));
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={isItemDetailModalShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ItemDetailModal