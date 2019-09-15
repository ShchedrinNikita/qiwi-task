import * as actionTypes from './types'

export const setLoading = q => {
    return {
        type: actionTypes.SET_LOADING,
        payload: q
    }
}

