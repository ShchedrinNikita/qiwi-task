import * as actionTypes from './types'

export const setVideoItems = items => {
    return {
        type: actionTypes.SET_VIDEO_ITEMS,
        payload: items
    }
}
export const setPageTokens = tokens => {
    return {
        type: actionTypes.SET_PAGE_TOKENS,
        payload: tokens
    }
}