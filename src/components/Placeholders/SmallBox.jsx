import React from 'react'

function SmallBox({ width, height }) {
    return (
        <>
            <div className="placeholder-glow my-5"
                style=
                {{
                    background: '#cccc',
                    borderRadius: "3px",
                    width: width,
                    height: height
                }}
            >
                <div className="placeholder rounded background">
                </div>
            </div>
        </>
    )
}

export default SmallBox