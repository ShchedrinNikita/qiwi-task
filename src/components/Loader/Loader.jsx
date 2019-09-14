import React from 'react'
import './Loader.scss'

const Loader = () => {
    return (
        <div>
            <div class="lds-css ng-scope">
                <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
        </div>
    )
}

export default Loader
