import React, { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import CheckoutInfo from '../../components/CheckoutInfo';
import CheckoutList from '../../components/CheckoutList';
import './Checkout.scss';

const Checkout = () => {
  const [key, setKey] = useState(1);
  const { isEmpty } = useCart();
  return (
    <div className="home-wrapper" style={{padding: 50}} >
      <Container className='checkout-wrapper'>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="checkout-tabs"
          onSelect={(k) => setKey(k)}
          activeKey={key}
          
        >
          <Tab eventKey={1} title="Cart" className='checkout-tab'>
            <CheckoutList setKey={setKey} />
          </Tab>
          <Tab eventKey={2} title="Checkout Info" disabled={isEmpty}>
            <CheckoutInfo />
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
          </Tab>
        </Tabs>
      </Container>
    </div>
  )
}

export default Checkout