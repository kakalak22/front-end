import * as types from "../constant/actionType";

const initialState = {
    isItemDetailModalShow: false,
    isLoginModalShow: false,
    isRegisterModalShow: false,
    isRecipeDetailModalShow: false,
    isLoading: false,
    user: {},
    recipe: {},
    cart: [],
    recipes:[]
};

const postReducer = (state = initialState, action) => {
    switch (action?.type) {
        case types.TOGGLE_ITEM_MODAL:
            return {
                ...state,
                isItemDetailModalShow: action.payload
            }
        case types.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                isLoginModalShow: action.payload
            }
        case types.TOGGLE_REGISTER_MODAL:
            return {
                ...state,
                isRegisterModalShow: action.payload
            }
        case types.TOGGLE_RECIPE_DETAIL_MODAL:
            return {
                ...state,
                isRecipeDetailModalShow: action.payload,
            }
        case types.SET_RECIPE_START:
            return{
                ...state,
                recipe: action.payload
            }
        case types.REGISTER_START:
            return {
                ...state,
                isLoading: true,

            }
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                // isRegisterModalShow: false
            }
        case types.REGISTER_FAIL:
            return{
                ...state,
            }
        case types.LOGIN_START:
            return {
                ...state,
                isLoading: true,

            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isLoginModalShow: false
            }
        case types.LOGIN_FAIL:
            return{
                ...state,
            }
        case types.LOGOUT_START:
            return{
                ...state,
                user: {}
            }
        case types.SET_ACCOUNT_START:
            return{
                ...state,
                user: action.payload
            }
        case types.SET_RECIPES_START:
            return{
                ...state,
                recipes: action.payload
            }
        default:
            return state;

    }
}

export default postReducer;