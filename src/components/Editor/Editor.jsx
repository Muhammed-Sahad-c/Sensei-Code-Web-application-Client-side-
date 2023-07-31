import ReactQuill from 'react-quill';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner.jsx';
import EditorPreview from './EditorPreview.jsx';
import { modules } from '../../constants/QuillToolbar.js';
import { programmingTags } from '../../constants/ProgrammingTags';

function Editor({ quillPage, setQuillPage, submitFunction, message, spinner, isQuestion, question, setQuestion, tags, setTags }) {

    // need to solve bug it is empty or not
    const state = useSelector(state => { return state });
    const [tagBoxValue, setTagBoxValue] = useState("");
    const [searchTagButton, setSearchTagButton] = useState(false);

    const { primaryBackground, primaryColor, secondaryBackground } = state.themeStyle;
    const style1 = { color: primaryColor, background: primaryBackground };

    const searchTag = e => {
        if (isQuestion === false) setSearchTagButton(false);
        else {
            setTagBoxValue(e.target.value);
            const value = e.target.value.toUpperCase();
            if (programmingTags.includes(value) && tags.includes(e.target.value) === false && tags.length <= 5) setSearchTagButton(true)
            else setSearchTagButton(false);
        }
    }

    const addTagToQuestion = e => {
        e.preventDefault();
        setTags(prevState => [tagBoxValue, ...prevState])
        setTagBoxValue("");
    }

    return (
        <div className='' style={style1}>
            <div className="container py-4">
                <div className="row">
                    <div className="col-12 d-flex gap-2 justify-content-between">
                        {
                            isQuestion ?
                                <input type="text" className='w-75 px-3 py-1 input-all' placeholder='Enter your qustion here....' onChange={e => setQuestion(e.target.value)} style={{ background: secondaryBackground, border: `1px solid ${primaryBackground}`, color: primaryColor }} />
                                :
                                <input type="text" className='w-75 px-3 py-1 input-all' placeholder='Enter your qustion here....' disabled style={{ background: secondaryBackground, border: `1px solid ${primaryBackground}`, color: primaryColor }} />
                        }
                        <button className='px-4 bgClr text-light  border-0 py-2 rounded my-2 d-flex justify-content-center' onClick={submitFunction}>
                            {
                                spinner === true ? <Spinner size="19px" /> : "submit"
                            }
                        </button>
                    </div>
                </div>

                <p className="text-danger">{message}</p>

                <div className='py-4 col-12'>
                    <input type="text" className='px-3 py-2 rounded border-0' placeholder='search tags here..' value={tagBoxValue} style={{ background: secondaryBackground, color: primaryColor, outline: "none" }} onChange={(e) => searchTag(e)} />
                    <button className={`px-3 py-2 mx-2 rounded bgClr text-light border-0 ${searchTagButton === true ? "" : "btn disabled"}`} onClick={addTagToQuestion}>add</button>
                    <div className="py-4">
                        {
                            tags.map(x => {
                                return <span className='my-2 px-4 text-uppercase bg-info mx-2 rounded py-2'>{x}</span>
                            })
                        }
                    </div>
                </div>

                <ReactQuill
                    theme="snow"
                    value={quillPage}
                    modules={modules}
                    onChange={setQuillPage}
                    className="qustionEditor"
                    placeholder="Enter details"
                />
                <EditorPreview visual={quillPage} secondaryBackground={secondaryBackground} color={primaryColor} />
            </div>
        </div>
    )
}

export default Editor