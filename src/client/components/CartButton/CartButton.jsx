import React from 'react'
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import "./CartButton.scss";
import {FaShoppingCart} from 'react-icons/fa';
import { image1 } from '../../../assets';



const CartButton = () => {

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className='heading-wrapper' >My Cart</Popover.Header>
      <Popover.Body>
        <div className='item-wrapper'>
          <img src={image1} alt="" width={50} height={50} />
          <p>Item name 1</p>
          <p>$10</p>
        </div>
        <div className='check-out-btn-wrapper'>
          <Button className='checkout-btn'>
            Checkout
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );
  
  return (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
      <Button className='cart-btn'><FaShoppingCart /></Button>
    </OverlayTrigger>
  )
}

export default CartButton