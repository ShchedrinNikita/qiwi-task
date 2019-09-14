import React from 'react'

const Search = ({ setSearchParam, searchParam, loadData }) => {
    const onChange = (e) => {
        setSearchParam(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (searchParam) {loadData()}
    }

    return (
        <form action="" onSubmit={onSubmit}>
            <input type="text" onChange={onChange} value={searchParam} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Search
