import * as actionTypes from '../actions/types'

const initialState = {
    isLoading: false
}

export const loading_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING:
            return {
                isLoading: action.payload
            };

        default:
            return state
    }
}