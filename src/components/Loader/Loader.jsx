import React from 'react'
import './Loader.scss'

const Loader = () => {
    return (
        <div>
            <div className="lds-css ng-scope">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
        </div>
    )
}

export default Loader
