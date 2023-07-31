import React from 'react'
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import { useSelector } from 'react-redux';
import Editor from '@monaco-editor/react';
import "../../assets/styles/Compailer.css";
import CompilerNavBar from './CompilerNavBar';
import { Play, EraserFill } from 'react-bootstrap-icons';
import { compileCode } from '../../services/CompilerServices';


function Compailer() {

    const [userLanguage, setUserLanguage] = useState({
        id: 63,
        name: "JavaScript (Node.js 12.14.0)"
    });
    const [userTheme, setUserTheme] = useState('vs-dark');
    const [fontSize, setFontSize] = useState(15);
    const [userCode, setUserCode] = useState(``);
    const [userInput, setUserInput] = useState("");
    const [userOutput, setUserOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const state = useSelector(state => { return state });
    const { primaryBackground, primaryColor, secondaryBackground } = state.themeStyle;

    const options = { fontSize: fontSize }

    const compile = async () => {
        setLoading(true);
        if (userCode === ``) {
            setLoading(false);
            return
        } else {
            const formData = {
                language_id: userLanguage.id,
                source_code: userCode,
                stdin: userInput,
            };

            const codeOutputResponse = await compileCode(formData);

            if (codeOutputResponse === null) {
                setLoading(false)
            }
            else {
                setLoading(false);
                setUserOutput(codeOutputResponse.data.stdout === null ? atob(codeOutputResponse.data.stderr) : atob(codeOutputResponse.data.stdout));
            }
        }
    }



    const clearOutput = () => setUserOutput('')

    const outputStyle = loading === true ? "d-flex justify-content-center align-items-center" : "d-flex jsustify-content-start"

    return (
        <div>
            <div className="container-fluid" style={{ background: primaryBackground }}>
                <div className="row">
                    <div className="col-12" style={{ position: "relative" }}>
                        <CompilerNavBar
                            userLanguage={userLanguage}
                            setUserLanguage={setUserLanguage}
                            userTheme={userTheme}
                            setUserTheme={setUserTheme}
                            fontSize={fontSize}
                            setFontSize={setFontSize} />
                    </div>
                    <div className="col-12 col-md-8 editorDiv p-0 pt-4 px-2 rounded " style={{ background: secondaryBackground }}>
                        <Editor
                            options={options}
                            height="calc(100vh - 30px)"
                            width="100%"
                            theme={userTheme}
                            language={userLanguage || "javascript"}
                            defaultLanguage="python"
                            defaultValue="# Enter your code here"
                            onChange={(value) => { setUserCode(value) }}
                        />
                        <div className="d-flex justify-content-end px-3 py-3">
                            <button className='px-4 py-2 rounded compilerbuttons' onClick={() => compile()}><Play /> run</button>
                        </div>
                    </div>
                    <div className="col-12 col-md-4" style={{ background: secondaryBackground }}>
                        <div className="row flex-column h-100 ">
                            <div className="col-12 py-4 my-3">
                                <h6 style={{ color: primaryColor }}>Input</h6>
                                <textarea id="code-inp" onChange=
                                    {(e) => setUserInput(e.target.value)}>
                                </textarea>
                            </div>
                            <div className="col-12 py-4" style={{ background: secondaryBackground }}>
                                <h6 style={{ color: primaryColor }}>output</h6>
                                <div className={`output px-3 py-3 rounded  ${outputStyle}`}>
                                    {
                                        loading ? <Spinner size={'20px'} /> : userOutput
                                    }
                                </div>
                            </div>
                            <div className="d-flex justify-content-end px-3">
                                <button className='px-4 py-2 rounded compilerbuttons' onClick={() => { clearOutput() }}>
                                    <EraserFill />  clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compailer 