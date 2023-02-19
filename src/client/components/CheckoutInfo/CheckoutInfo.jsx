import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import SelectDistrict from './Address/SelectDistrict'
import SelectProvince from './Address/SelectProvince'
import SelectWard from './Address/SelectWard'
import "./CheckoutInfo.scss";

const CheckoutInfo = () => {
  const [province, setProvince] = useState({id:1}) 
  const [district, setDistrict] = useState({});
  const [ward, setWard] = useState({});
  return (
    <Container className='checkout-info-wrapper'>
      <Container className='checkout-form-wrapper'>
        <SelectProvince setProvince={setProvince} />
        <SelectDistrict provinceId={province.id} setDistrict={setDistrict} />
        <SelectWard districtId={district.id} />
      </Container>
      <Container className='checkout-form-wrapper'>
        
      </Container>
    </Container>
  )
}

export default CheckoutInfo