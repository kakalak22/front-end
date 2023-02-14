import * as types from "../constant/actionType";

const initialState = {
    isItemDetailModalShow:false,
    
};

const postReducer = (state = initialState, action) => {
    switch (action?.type) {
        case types.TOOGLE_ITEM_MODAL:
            return{
                ...state,
                isItemDetailModalShow: action.payload
            }
        default:
            return state;

    }
}

export default postReducer;