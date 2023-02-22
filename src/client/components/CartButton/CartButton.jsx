import React from 'react'
import { Badge, Button, OverlayTrigger, Popover } from 'react-bootstrap';
import "./CartButton.scss";
import { FaShoppingCart } from 'react-icons/fa';
import { image1 } from '../../../assets';
import { useCart } from 'react-use-cart';
import subString from '../../../utils/subString';
import { useNavigate } from 'react-router-dom';



const CartButton = () => {
  const {
    emptyCart,
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
  } = useCart();

  const navigate = useNavigate()

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3" className='heading-wrapper' >My Cart</Popover.Header>
      <Popover.Body style={{maxHeight:'300px', overflowY: "auto"}}>
        {isEmpty && <h4>Your cart is empty</h4>}
        {items.map((item) =>
          <div className='item-wrapper'>
            <img src={item.image} alt="" width={50} height={50} />
            <p className='item-name'>{subString(item.name, 15 )} x {item.quantity}</p>
            <p>${item.itemTotal}</p>
          </div>
        )}
        <div className='check-out-btn-wrapper'>
          <Button className='clear-btn' onClick={emptyCart}>
            Clear
          </Button>
          <Button className='checkout-btn' onClick={()=>navigate("/checkout")}>
            Checkout
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
      <Button className='cart-btn'>
        <FaShoppingCart />
       {!isEmpty && <Badge className='cart-badge' pill bg='danger'>{totalUniqueItems}</Badge>}
      </Button>
    </OverlayTrigger>
  )
}

export default CartButton