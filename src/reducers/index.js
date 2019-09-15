import { combineReducers } from 'redux'
import { search_reducer} from './search-reducer'
import { video_data_reducer } from './video-data-reducer'

const rootReducer = combineReducers({
    search: search_reducer,
    videoData: video_data_reducer
    })

export default rootReducer