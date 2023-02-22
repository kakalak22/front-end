import React from 'react'
import { Container } from 'react-bootstrap';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import ItemListRecipes from '../../components/ItemList/ItemListRecipes';
import "./SearchResult"

const SearchResult = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
  return (
    <div className="home-wrapper" style={{padding: 50, minHeight:'100vh'}} >

        <Container>
            <ItemListRecipes/>
        </Container>

    </div>
  )
}

export default SearchResult