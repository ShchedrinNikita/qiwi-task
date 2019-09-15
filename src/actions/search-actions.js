import * as actionTypes from './types'

export const setSearchParam = string => {
    return {
        type: actionTypes.SET_SEARCH_PARAM,
        payload: string
    }
}