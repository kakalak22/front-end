import React from 'react';
import './Payment.scss';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import {Buffer} from 'buffer';
import { MomoPaymentService } from './momo';

const partnerCode = 'MOMOEGRF20210401';
const accessKey = '9j6umB3xGx9vh1O4';
const secrectKey = 'MNRSbCcvh5P81yPCCYToLj0BEEU7EhZq';
const apiEndpoint = 'https://test-payment.momo.vn/v2/gateway/api/create'

const Payment = () => {
  const momo = new MomoPaymentService(partnerCode,accessKey,secrectKey,apiEndpoint);
  const body = {
    orderId: 1,
    amount: 5,
    orderInfo : 'Your message',
    returnUrl : 'http://localhost:5173/',
  }
  const res = momo.createPayment({
    orderId: 1,
    amount: 5,
    orderInfo : 'Your message',
    returnUrl : 'http://localhost:5173/',
  });
  console.log(res)
console.log("Sending....")
  return (
    <div>Payment</div>
  )
}

export default Payment