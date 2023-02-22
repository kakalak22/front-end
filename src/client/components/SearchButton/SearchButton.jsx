import React from 'react'
import { Badge, Button, Form, InputGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import "./SearchButton.scss";
import { FaSearch, } from 'react-icons/fa';
import { useCart } from 'react-use-cart';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';



const SearchButton = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            search: ''
        },
        onSubmit: values => {
            console.log(values);
            navigate({
                pathname: '/search',
                search: `?${createSearchParams({
                    query: values.search
                })}`,
              });
        },
    });


    const popover = (
        <Popover id="popover-basic">
            {/* <Popover.Header as="h3" className='heading-wrapper' >My Cart</Popover.Header> */}
            <Popover.Body className='pop-search-body'>
                <Form onSubmit={formik.handleSubmit}>
                    <InputGroup>
                        <Form.Control
                            className='password-input'
                            type='text'
                            placeholder='Search'
                            name='search'
                            value={formik.values.search}
                            onChange={formik.handleChange}
                        />
                        <Button style={{ backgroundColor: '#f54748', borderColor: '#f54748' }} type='submit'>
                            <FaSearch />
                        </Button>
                    </InputGroup>
                </Form>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="left" overlay={popover}>
            <Button className='search-btn'>
                <FaSearch />
            </Button>
        </OverlayTrigger>
    )
}

export default SearchButton