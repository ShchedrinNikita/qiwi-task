import * as actionTypes from '../actions/types'

const initialState = {
    pageTokenYouTube: '',
    pageTokenVimeo: '',
    items: []
}

export const video_data_reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_VIDEO_ITEMS:
            return {
                ...state,
                items: action.payload
            };
        case actionTypes.SET_PAGE_TOKENS:
            return {
                ...state,
                pageTokenYouTube: action.payload.pageTokenYouTube,
                pageTokenVimeo: action.payload.pageTokenVimeo
            };

        default:
            return state
    }
}