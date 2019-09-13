import React from 'react'
import './List.scss'

const List = ({ data }) => {
    return (
        <div className="list">
            { data.items.map((el, i) => 
                <div className="card" key={i}>
                    <div className="img" style={{ backgroundImage: `url(${el.img})`}}></div>
                    <div className="title">{el.name}</div>
                </div> )}
        </div>
    )
}

export default List
