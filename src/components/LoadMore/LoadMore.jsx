import React from 'react'
import './LoadMore.scss'

const LoadMore = ({ onClick }) => {
    return (
        <div className="load-more" onClick={onClick}>Load more.</div>
    )   
}

export default LoadMore
