import axios from 'axios'
import { useFormik } from 'formik'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Container, Form } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCart } from 'react-use-cart'
import SelectDistrict from './Address/SelectDistrict'
import SelectProvince from './Address/SelectProvince'
import SelectWard from './Address/SelectWard'
import "./CheckoutInfo.scss";

const paymentTypes = [
  {
    id: 1,
    name: "Online"
  },
  {
    id: 2,
    name: "COD"
  }
]

const CheckoutInfo = () => {
  const [province, setProvince] = useState({ id: 1 })
  const [district, setDistrict] = useState({});
  const [ward, setWard] = useState({});
  const [address, setAddress] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const { isLoginModalShow, user } = useSelector(state => ({ ...state.data }));
  const { items, cartTotal,emptyCart } = useCart();
  const navigate = useNavigate();

  const handleSelectChange = (e) => {
    setPaymentType(e.target.value);
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const saveOrder = async (body) => {
    const res = await axios.post('http://localhost:8080/orders/', body);
    if (res.data) {
      saveItems(res.data)
    }
  }

  const saveItems = (order) => {
    let isError = false;
    items.forEach(async (item) => {
      const quantity = item.quantity;
      delete item.quantity;
      console.log(quantity)
      delete item.itemTotal;
      console.log(order)
      const body = {
        order: order,
        ingredient: item,
        quantity: quantity
      }
      const res = await axios.post('http://localhost:8080/orderitem/', body)
        .catch((error) => { isError = true });
      console.log(res.data);
    })
    if(!isError){
      emptyCart();
      toast.success(`Order placed`,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate('/');
    }
  }

  const handlePlaceOrder = () => {
    const date = moment().format();
    const order = {
      status: "Verifying",
      address: address,
      paymentType: paymentType,
      totalPrice: cartTotal,
      account: user,
      createAt: date
    }
    saveOrder(order);

  }

  // useEffect(() => {
  //   if (province.value && district.value && ward.value) {
  //     const address = `${province.value} ${district?.value} ${ward?.value}`;
  //     setAddress(address);
  //   }
  // }, [ward, province, district])

  return (
    <Container style={{ padding: 50 }}>
      <h2 style={{ textAlign: 'center', }}>Checkout Info</h2>
      <Container className='checkout-info-wrapper'>
        <Container className='checkout-form-wrapper'>
          <SelectProvince setProvince={setProvince} />
          <SelectDistrict provinceId={province.id} setDistrict={setDistrict} />
          <SelectWard districtId={district.id} setWard={setWard} />
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Payment type</Form.Label>
            <Form.Select onChange={handleSelectChange}>
              {paymentTypes.map((type) =>
                <option key={type.id} value={type.name}  >
                  {type.name}
                </option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Detail Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Detail Address"
              name="address"
              value={address}
              onChange={handleAddressChange}
            />
          </Form.Group>
        </Container>
        <Container className='checkout-items-wrapper'>
          {items.map((item) =>
            <Container className='checkout-list-wrapper'>
              <div className='checkout-image-container'>
                <img src={item.image} alt="" width='100%' height='100%' />
              </div>
              <div className='checkout-info-container'>
                <h4 style={{ margin: "0 !important" }}>{item.name}</h4>
                <div className='info-text'>
                  <Badge bg='info'>Price:</Badge>
                  <p >${item.price}</p>
                </div>
                <div className='info-text'>
                  <Badge bg='info'>Sum:</Badge>
                  <p >${item.itemTotal}</p>
                </div>
              </div>
            </Container>
          )}
        </Container>
      </Container>
      <Container className='total-checkout-container'>
        <Button className='place-order-btn' onClick={handlePlaceOrder}>
          Place Order
        </Button>
        <h3 style={{ margin: 0, display: 'flex', alignItems: 'center' }}>
          <Badge bg='primary'>Total:</Badge>{cartTotal.toFixed(2)}
        </h3>

      </Container>
    </Container>
  )
}

export default CheckoutInfo