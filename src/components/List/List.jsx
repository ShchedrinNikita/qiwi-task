import React, { Component } from 'react'
import { connect } from 'react-redux'
import './List.scss'
import { setVideoItems, setPageTokens } from '../../actions/video-data-actions'
import { loadData } from '../../services/apiServiceV2'
import LoadMore from '../LoadMore/LoadMore'
import { setLoading } from '../../actions/loading-action'

class List extends Component {

    loadMore = async() => {
        const { searchParam, pageTokenYouTube, pageTokenVimeo, allItems, setVideoItems, setPageTokens, setLoading } = this.props
        setLoading(true)
        const data = await loadData(searchParam, pageTokenYouTube, pageTokenVimeo, 'more')
        setVideoItems([...allItems, ...data.items])
        setPageTokens({
            pageTokenYouTube: data.pageTokenYouTube,
            pageTokenVimeo: data.pageTokenVimeo
        })
        setLoading(false)
    }
    
    render() {
        const { allItems } = this.props
        return !!allItems.length && (
            <div className="list">
                <div className="set">
                    { allItems.map((el, i) => 
                        <div className="card" key={i} style={{backgroundColor: el.type === 'yt' ? 'tomato' : 'green'}}>
                            <div className="img" style={{ backgroundImage: `url(${el.img})`}}></div>
                            <div className="title">{el.name}</div>
                        </div> )}
                </div>
                <LoadMore onClick={this.loadMore}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    pageTokenYouTube: state.videoData.pageTokenYouTube,
    pageTokenVimeo: state.videoData.pageTokenVimeo,
    allItems: state.videoData.items,
    searchParam: state.search.searchParam,
})
export default connect(mapStateToProps, {setVideoItems, setPageTokens, setLoading})(List)