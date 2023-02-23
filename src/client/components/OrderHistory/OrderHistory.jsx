import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import subString from '../../../utils/subString';

const OrderHistory = () => {
    const { user } = useSelector(state => ({ ...state.data }));
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState();
    const [orderItems, setOrderItems] = useState([]);
    const [viewOrder, setViewOrder] = useState(-1);
    const userA =JSON.parse(localStorage.getItem('user'));


    const loadOrder = async () => {

        const result = await axios.get(`http://localhost:8080/orders/account/${user.id}`);
        setOrders(result.data)
    };
    const loadOrderItem = async (id) => {
        const result = await axios.get(`http://localhost:8080/orderitem/${id}`);
        setOrderItems(result.data)
    };

    const handleViewOrderItem = (id) => {
        loadOrderItem(id);
        setViewOrder(prev => prev > 0 ? -1 : id);
    }

    useEffect(() => {
        setUserId(userA.id);
        console.log(userId)
        loadOrder();
    }, [userId])

    return (
        <Container>
            <Table bordered hover className='mt-5' style={{ cursor: 'pointer' }}>
                <thead>
                    <tr style={{height: 50}}>
                        <th>#</th>
                        <th>Total Price</th>
                        <th>Address</th>
                        <th>Payment Type</th>
                        <th>Status</th>
                        <th>Order date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => {
                        return (
                            <React.Fragment>
                                <tr 
                                key={index} 
                                onClick={() => handleViewOrderItem(order.id)} 
                                style={viewOrder === order.id ? {backgroundColor: '#febd2e', height:50} :  {height:50}}>
                                    <td>{order.id}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.address}</td>
                                    <td>{order.paymentType}</td>
                                    <td>{order.status}</td>
                                    <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>
                                </tr>
                                {viewOrder === order.id &&
                                    <React.Fragment>
                                        <tr>
                                            <td>Ingredient ID</td>
                                            <td>Ingredient Image</td>
                                            <td>Ingredient Name</td>
                                            <td>Ingredient Price</td>
                                            <td>Ingredient Calories</td>
                                            <td>Ingredient Description</td>

                                        </tr>
                                        {orderItems.map(({ ingredient }, index) => {
                                            return (
                                                <tr backgroundColor="#febd2e">
                                                    <td>{ingredient.id}</td>
                                                    <td><img src={ingredient.image} width={50} height={50}/></td>
                                                    <td>{ingredient.name}</td>
                                                    <td>{ingredient.price}</td>
                                                    <td>{ingredient.calories}</td>
                                                    <td>{subString(ingredient.description,50)}</td>
                                                </tr>
                                            )
                                        })}
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}

export default OrderHistory