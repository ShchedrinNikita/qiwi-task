import React from 'react'
import './Search.scss'

const Search = ({ setSearchParam, searchParam, loadData }) => {
    const onChange = (e) => {
        setSearchParam(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (searchParam) {loadData()}
    }

    return (
        <form action="" onSubmit={onSubmit} className="search-bar">
            <input type="text" onChange={onChange} value={searchParam} />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search
