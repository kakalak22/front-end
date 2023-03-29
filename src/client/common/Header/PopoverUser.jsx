import React from 'react'
import { Button, Popover } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAccount } from '../../../redux/action';

const PopoverUser =
    React.forwardRef(
        ({ popper, children, show: _, ...props }, ref) => {
            const { data } = props;
            const dispatch = useDispatch();
            const handleLogout = () => {
                dispatch(logoutAccount());
            }
            const navigate = useNavigate();

            return (
                <Popover ref={ref} body {...props}>
                    <Popover.Body>
                        <div className='item-wrapper' style={{ display: 'flex', justifyContent: 'center' }}>
                            <p>{data.username}</p>
                        </div>
                        <div className='check-out-btn-wrapper'>
                            <Button
                                className='checkout-btn'
                                style={{ marginRight: '10px' }}
                                onClick={()=>navigate("profile")}
                            >
                                View Profile
                            </Button>
                            <Button className='checkout-btn' onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </Popover.Body>
                </Popover>
            );
        })


export default PopoverUser