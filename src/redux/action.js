import * as types from "../constant/actionType";
import axios from "axios";

const fetchPostStart = () => ({
    type: types.FETCH_POST_START
})

const fetchPostSuccess = (posts) => (
    {
        type: types.FETCH_POST_SUCCESS,
        payload: posts
    }
)

const fetchPostFail = (error) => ({
    type: types.FETCH_POST_FAIL,
    payload: error
})

const toggleItemModalStart = (status) => ({
    type: types.TOOGLE_ITEM_MODAL,
    payload: status
})

export function toggleItemModal(status){
    return function (dispatch){
        dispatch(toggleItemModalStart(status));
    }
}

export function fetchPost() {
    return function (dispatch) {
        dispatch(fetchPostStart());
        axios.get("https://jsonplaceholder.typicode.com/posts/1/comments")
            .then((response) => {
                const posts = response.data;
                dispatch(fetchPostSuccess(posts));
            })
            .catch((error) => {
                dispatch(fetchPostFail(error.message));
            })
    }
}

