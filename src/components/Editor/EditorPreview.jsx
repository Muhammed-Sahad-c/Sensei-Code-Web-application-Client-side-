import React from 'react'

function EditorPreview({ visual, secondaryBackground }) {
    return (
        <div >
            <div className=' mt-5 pt-3 '>
                <h5 className='previewHeading fw-light'>preview</h5>
                <div dangerouslySetInnerHTML={{ __html: visual }} className="previewBody p-3" style={{ background: secondaryBackground }}></div>
            </div>
        </div>
    )
}

export default EditorPreview