import React, { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import FavoriteRecipe from '../../components/FavoriteRecipe';
import OrderHistory from '../../components/OrderHistory';
import ProfileDetail from '../../components/ProfileDetail';
import './Profile.scss';

const Profile = () => {
    const [key, setKey] = useState(1);
    return (
        <div className="home-wrapper">
            <Container className='profile-wrapper'>
                <Container className='profile-tabs-wrapper'>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="checkout-tabs"
                        onSelect={(k) => setKey(k)}
                        activeKey={key}
                    >
                        <Tab eventKey={1} title="My Profile">
                            <ProfileDetail/>
                        </Tab>
                        <Tab eventKey={2} title="Order History">
                            <OrderHistory/>
                        </Tab>
                        <Tab eventKey={3} title="My Favorite Recipes" >
                            <FavoriteRecipe/>
                        </Tab>
                    </Tabs>
                </Container>
            </Container>
        </div>
    )
}

export default Profile