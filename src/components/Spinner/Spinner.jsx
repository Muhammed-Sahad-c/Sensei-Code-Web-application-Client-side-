import React from 'react'
import "../../assets/styles/Spinner.css"

function Spinner({ size, color }) {
    return (
        <div>
            <div className="spinner">
                <div className="spinner1" style={{ width: size, height: size, borderTopColor: color }}>
                </div>
            </div>
        </div>
    )
}

export default Spinner