import React, { Component } from 'react'
import { connect } from 'react-redux'
import './List.scss'
import { setVideoItems, setPageTokens } from '../../actions/video-data-actions'
import { loadData } from '../../services/apiServiceV2'
import LoadMore from '../LoadMore/LoadMore'
import { setLoading } from '../../actions/loading-action'

class List extends Component {

    loadMore = async() => {
        this.props.setLoading(true)
        const data = await loadData(this.props.searchParam, this.props.pageTokenYouTube, this.props.pageTokenVimeo, 'more')
        console.log(data,  this.props.pageTokenYouTube, this.props.pageTokenVimeo)
        this.props.setVideoItems([...this.props.allItems, ...data.items])
        this.props.setPageTokens({
            pageTokenYouTube: data.pageTokenYouTube,
            pageTokenVimeo: data.pageTokenVimeo
        })
        this.props.setLoading(false)
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
    isLoading: state.loading.isLoading
})
export default connect(mapStateToProps, {setVideoItems, setPageTokens, setLoading})(List)