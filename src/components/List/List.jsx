import React from 'react'
import './List.scss'

const List = ({ vimeoData, youTubeData, isLoadingYouTube, isLoadingVimeo, allItems }) => {
    if (allItems.length) {
        
        return (
            <div className="list">
                { allItems.map((el, i) => 
                    <div className="card" key={i} style={{backgroundColor: el.type === 'vd' ? 'tomato' : 'green'}}>
                        <div className="img" style={{ backgroundImage: `url(${el.img})`}}></div>
                        <div className="title">{el.name}</div>
                    </div> )}
            </div>
        )
    } else return null
}

export default List
