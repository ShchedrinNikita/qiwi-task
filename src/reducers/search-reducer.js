import * as actionTypes from '../actions/types'

const initialState = {
    searchParam: ''
}

export const search_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEARCH_PARAM:
            return {
                searchParam: action.payload
            };

        default:
            return state
    }
}