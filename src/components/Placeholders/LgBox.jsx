import React from 'react'

function LgBox({ height, width }) {
    return (
        <div>
            <div className="col-12 placeholder-glow my-2" style={{background:'#cccc', borderRadius:"5px"}}>
                <div className="placeholder rounded background " style={{ height: height, width: "100%" }}>
                </div>
            </div>
        </div>
    )
}

export default LgBox