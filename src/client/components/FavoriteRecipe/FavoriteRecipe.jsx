import { async } from '@firebase/util';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { setRecipe, toggleRecipeDetailModal } from '../../../redux/action';
import subString from '../../../utils/subString';

const FavoriteRecipe = () => {
    const { user } = useSelector(state => ({ ...state.data }));
    const [myFavorites, setMyFavorites] = useState([]);
    const loadMyFavor = async () => {
        const res = await axios.get(`http://localhost:8080/accountFavoriteRecipe/search?keyword=${user.username}&column=account`);
        setMyFavorites(res.data);
        console.log(myFavorites);
    }

    useEffect(() => {
        loadMyFavor();
    }, [])

    const handleViewRecipe = (data) => {
        dispatch(setRecipe(data))
        dispatch(toggleRecipeDetailModal(true));
    
    }

    const handleRemove = async(id) =>{
        console.log(id)
        await axios.delete(`http://localhost:8080/accountFavoriteRecipe/${id}`);
        loadMyFavor();
    }

    return (
        <Container style={{padding:50}}>
            {myFavorites.map(({id,recipe}, index) =>{ 
            return(
            <Container key={index} style={{ textAlign: 'start', padding: ' 0 50px', width:'100%' }}>
                <Container className="item-recipe" >
                    <img src={recipe.image} alt="" width={150} height={150} />
                    <Container className="item-recipe__info" >
                        <h3 onClick={() => handleViewRecipe(recipe)} >{recipe.name}</h3>
                        <p>Calories: <span>{recipe.calories}</span></p>
                        <p>{subString(recipe.tutorial, 250)}</p>
                    </Container>
                    {/* <Container style={{width: 50}}>
                        <Button variant='warning' onClick={()=>handleRemove(id)} ><MdDelete/>Remove</Button>
                    </Container> */}
                </Container>
            </Container>
            )})}
        </Container>
    )
}

export default FavoriteRecipe