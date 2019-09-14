import React from 'react'
import './LoadMore.scss'

const LoadMore = ({ loadMoreData }) => {
    return (
        <div className="load-more" onClick={loadMoreData}>Load more.</div>
    )
}

export default LoadMore
