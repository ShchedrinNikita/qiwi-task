import React from 'react'
import './List.scss'
import Loader from '../Loader/Loader'

const List = ({ vimeoData, youTubeData, isLoadingYouTube, isLoadingVimeo, allItems }) => {
    if (allItems.length) {
        // let data = []
        // if(!isLoadingYouTube && !isLoadingVimeo) {
        //     for(let i = 0; i < youTubeData.items.length; i++) {
        //         if(vimeoData.items[i]) data.push({...vimeoData.items[i], type: 'vd'})
        //         if(youTubeData.items[i]) data.push({...youTubeData.items[i], type: 'yt'})
        //     }
        // }
        return (
            <div className="list">
                { allItems.map((el, i) => 
                    <div className="card" key={i} style={{backgroundColor: el.type === 'vd' ? 'tomato' : 'green'}}>
                        <div className="img" style={{ backgroundImage: `url(${el.img})`}}></div>
                        <div className="title">{el.name}</div>
                    </div> )}
                {/* { isLoadingYouTube || isLoadingVimeo ? <Loader/> : null } */}
            </div>
        )
    } else return null
}

export default List
