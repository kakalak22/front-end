import * as types from "../constant/actionType";

const initialState = {
    isItemDetailModalShow:false,
    isLoginModalShow: false,
    isRegisterModalShow: false,
};

const postReducer = (state = initialState, action) => {
    switch (action?.type) {
        case types.TOGGLE_ITEM_MODAL:
            return{
                ...state,
                isItemDetailModalShow: action.payload
            }
        case types.TOGGLE_LOGIN_MODAL:
            return{
                ...state,
                isLoginModalShow: action.payload
            }
        case types.TOGGLE_REGISTER_MODAL:
            return{
                ...state,
                isRegisterModalShow: action.payload
            }
        default:
            return state;

    }
}

export default postReducer;