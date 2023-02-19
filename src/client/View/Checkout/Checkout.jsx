import React, { useState } from 'react';
import CheckoutInfo from '../../components/CheckoutInfo';
import CheckoutList from '../../components/CheckoutList';
import './Checkout.scss';

const Checkout = () => {
  const [checkoutStep, setCheckoutStep] = useState(2)
  return (
    <div className="home-wrapper" style={{textAlign:'left'}}>
      <div style={{ minHeight: 800 }}>
        {checkoutStep === 1 ?
          <CheckoutList /> :
          <CheckoutInfo />
        }
      </div>
    </div>
  )
}

export default Checkout