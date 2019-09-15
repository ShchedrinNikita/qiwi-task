import { combineReducers } from 'redux'
import { search_reducer} from './search-reducer'
import { video_data_reducer } from './video-data-reducer'
import { loading_reducer } from './loading-reducer'

const rootReducer = combineReducers({
    search: search_reducer,
    videoData: video_data_reducer,
    loading: loading_reducer
    })

export default rootReducer