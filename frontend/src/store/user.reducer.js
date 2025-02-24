// import { userService } from '../services/user.service.local'
import { userService } from '../services/user.service'

// export const INCREMENT = 'INCREMENT'
// export const DECREMENT = 'DECREMENT'
// export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
// export const SET_SCORE = 'SET_SCORE'
export const SET_WISHLIST = 'SET_WISHLIST'

const initialState = {
    // count: 10,
    user: null,
    user: userService.getLoggedinUser() ? { ...userService.getLoggedinUser() } : null,
    watchedUser: null
}

export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        // case INCREMENT:
        //     newState = { ...state, count: state.count + 1 }
        //     break
        // case DECREMENT:
        //     newState = { ...state, count: state.count - 1 }
        //     break
        // case CHANGE_COUNT:
        //     newState = { ...state, count: state.count + action.diff }
        //     break
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        // case SET_SCORE:
        //     newState = { ...state, user: { ...state.user, score: action.score } }
        //     break
        case SET_WISHLIST:
            newState = (userService.getLoggedinUser()) ? { ...state, user: { ...state.user, wishlist: action.wishlist } } : { ...state }
        default:
    }
    // For debug:
    window.userState = newState
    // console.log('State:', newState)
    return newState

}
