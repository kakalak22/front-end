import React from 'react'
import { Container, Stack } from 'react-bootstrap'
import { ItemCard } from '../../common'
import './ItemList.scss';

const ItemList = () => {
    const dummyData = [ 1, 2, 3, 4 ,5, 6]
  return (
    <Container>
        <Stack  direction='horizontal' className='item-list-wrapper' gap={5}>
            {dummyData.map(()=>{
                return <ItemCard/>
            })}
        </Stack>
    </Container>
  )
}

export default ItemList