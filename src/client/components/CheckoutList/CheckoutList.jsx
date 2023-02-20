import React from 'react';
import { Badge, Button, Container, Stack } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { emptyCart, image1 } from '../../../assets';
import './CheckoutList.scss';

const CheckoutList = ({setKey}) => {
    const {
        isEmpty,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal
    } = useCart();
    const navigate = useNavigate();
    return (
        <Container
            style={{ padding: '50px' }}>
            <h2 style={{textAlign:'center'}}>My Cart</h2>
            <Container className='checkout-container'>
                {isEmpty &&
                    <Container
                        style=
                        {{
                            height: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}>
                        <h2>No item in cart. Back to 
                            <Button variant='link' onClick={()=>navigate('/')}>
                                <h2>Homepage</h2>
                            </Button>
                        </h2>
                        <img src={emptyCart} alt="" />
                    </Container>}
                {items.map((item) =>
                    <Container className='checkout-list-wrapper'>
                        <div className='checkout-image-container'>
                            <img src={item.image} alt="" width='100%' height='100%' />
                        </div>
                        <div className='checkout-info-container'>
                            <h3>{item.name}</h3>
                            <div className='info-text'>
                                <Badge bg='info'>Price:</Badge>
                                <p >${item.price}</p>
                            </div>
                            <div className='info-text'>
                                <Badge bg='info'>Sum:</Badge>
                                <p >${item.itemTotal}</p>
                            </div>
                        </div>
                        <div className='button-modify-container'>
                            <Button className='modify-btn'
                                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            >-</Button>
                            <span>{item.quantity}</span>
                            <Button className='modify-btn'
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            >+</Button>
                            <Button variant='warning' style={{ width: 50, height: 50 }} onClick={() => removeItem(item.id)}><MdDelete /></Button>
                        </div>
                    </Container>
                )}
                {!isEmpty && <Container className='total-container'>
                    <h3 style={{margin:0,display:'flex', alignItems:'flex-end', gap: '20px'}}><Badge bg='primary'>Total:</Badge>{cartTotal.toFixed(2)} </h3>
                    <Button className='checkout-btn' onClick={()=>setKey(2)}>Checkout</Button>
                </Container>}
            </Container>
        </Container>
    )
}

export default CheckoutList