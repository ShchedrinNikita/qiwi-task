import React from 'react'
import './Search.scss'
import { connect } from 'react-redux'
import { setSearchParam } from '../../actions/search-actions'
import { setLoading } from '../../actions/loading-action'
import { setPageTokens, setVideoItems } from '../../actions/video-data-actions'
import { loadData } from '../../services/apiServiceV2'

const Search = ({ searchParam, setVideoItems, setPageTokens, setSearchParam, setLoading }) => {
    const onChange = (e) => {
        setSearchParam(e.target.value)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        if (!searchParam) return
        setLoading(true)
        const data = await loadData(searchParam, null, null, 'load')
        console.log(data)
        setVideoItems(data.items)
        setPageTokens({
            pageTokenYouTube: data.pageTokenYouTube,
            pageTokenVimeo: data.pageTokenVimeo
        })
        setLoading(false)
    }

    return (
        <form action="" onSubmit={onSubmit} className="search-bar">
            <input type="text" onChange={onChange} value={searchParam} />
            <button type="submit">Search</button>
        </form>
    )
}
const mapStateToProps = (state) => ({
    searchParam: state.search.searchParam,
    isLoading: state.loading.isLoading
})
export default connect(mapStateToProps, {setSearchParam, setVideoItems, setPageTokens, setLoading})(Search)
