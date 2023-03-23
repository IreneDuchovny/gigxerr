export const SET_USER_ORDERS = "SET_USER_ORDERS";
export const REMOVE_ORDER = "REMOVE_ORDER";
export const ADD_ORDER = "ADD_ORDER";
export const SET_CURRENT_ORDER = "SET_CURRENT_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const SET_SELLER_ORDERS = "SET_SELLER_ORDERS";

const initialState = {
  order: {},
  userOrders: null,
  lastRemovedOrder: null,
  sellerOrders: null,
};

export function orderReducer(state = initialState, action) {
    var newState = state
    var userOrders
    var sellerOrders
    // console.log('action', action);
    switch (action.type) {
        case SET_USER_ORDERS:
            newState = { ...state, userOrders: action.orders }
            break
        case SET_SELLER_ORDERS:
            newState = { ...state, sellerOrders: action.orders }
            break
        case REMOVE_ORDER:
            newState = { ...state, order: {} }
            break
        case ADD_ORDER:
            newState = { ...state, order: action.order }
            break
        case SET_CURRENT_ORDER:
            newState = { ...state, order: action.order }
            break
        case UPDATE_ORDER:
            userOrders = state.userOrders.map((order) => (order._id === action.order._id ? action.order : order))
            sellerOrders = state.sellerOrders.map((order) => (order._id === action.order._id ? action.order : order))
            newState = { ...state, userOrders, sellerOrders }
            break
        default:
    }
    return newState
}
