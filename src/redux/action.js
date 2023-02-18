import * as types from "../constant/actionType";
import axios from "axios";
import { toast } from "react-toastify";

const fetchPostStart = () => ({
    type: types.FETCH_POST_START
})

const fetchPostSuccess = (posts) => (
    {
        type: types.FETCH_POST_SUCCESS,
        payload: posts
    }
)

const registerFail = (error) => ({
    type: types.REGISTER_FAIL,
    payload: error
})

const registerStart = () => ({
    type: types.REGISTER_START
})

const registerSuccess = (posts) => (
    {
        type: types.REGISTER_SUCCESS,
        payload: posts
    }
)


const toggleItemModalStart = (status) => ({
    type: types.TOGGLE_ITEM_MODAL,
    payload: status
})

const toggleLoginModalStart = (status) => ({
    type: types.TOGGLE_LOGIN_MODAL,
    payload: status
})

const toggleRecipeDetailModalStart = (status) => ({
    type: types.TOGGLE_RECIPE_DETAIL_MODAL,
    payload: status
})

const toggleRegisterModalStart = (status) => ({
    type: types.TOGGLE_REGISTER_MODAL,
    payload: status
})

const logoutAccountStart = () =>({
    type: types.LOGOUT_START,
    payload: false
})

const setAccountStart = (recipe) => ({
    type: types.SET_ACCOUNT_START,
    payload: recipe
})

const setRecipeStart = (user) => ({
    type: types.SET_RECIPE_START,
    payload: user
})

export function toggleItemModal(status) {
    return function (dispatch) {
        dispatch(toggleItemModalStart(status));
    }
}

export function toggleLoginModal(status) {
    return function (dispatch) {
        dispatch(toggleLoginModalStart(status));
    }
}

export function toggleRegisterModal(status) {
    return function (dispatch) {
        dispatch(toggleRegisterModalStart(status));
    }
}

export function toggleRecipeDetailModal(status) {
    return function (dispatch) {
        dispatch(toggleRecipeDetailModalStart(status));
    }
}


export function registerAccount(body) {
    return function (dispatch) {
        dispatch(registerStart());
        axios.post(`http://localhost:8080/accounts/`, body)
            .then((response) => {
                const user = response.data;
                dispatch(registerSuccess(user));
                localStorage.setItem('user', JSON.stringify(user))
            })
            .catch((error) => {
                dispatch(registerFail('Username already taken, choose another username'));
                toast.error('Username or Email existed, choose another', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            })
    }
}

export function logoutAccount(){
    return function (dispatch){
        dispatch(logoutAccountStart());
        localStorage.removeItem('user');
    }
}

export function setAccount(user){
    return function (dispatch) {
        dispatch(setAccountStart(user));
    }
}
export function setRecipe(recipe){
    return function (dispatch) {
        dispatch(setRecipeStart(recipe));
    }
}