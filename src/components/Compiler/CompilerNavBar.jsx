import Select from 'react-select';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import { List } from 'react-bootstrap-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/esm/Container';
import { languageOptions } from '../../constants/languageOptions';


function CompilerNavBar({ userLanguage, setUserLanguage, userTheme, setUserTheme, fontSize, setFontSize }) {
    const state = useSelector(state => { return state });
    const { primaryBackground, primaryColor, secondaryBackground } = state.themeStyle;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const style2 = { color: primaryColor };
    const style1 = { color: primaryColor, background: primaryBackground };
    const style4 = { color: primaryColor, "background": secondaryBackground };

    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ]

    return (
        <div className='p-0'>
            <Navbar style={{ "background": primaryBackground, height: "50px" }} >
                <Container>
                    <button onClick={handleShow} className="sidebarButton" style={style1}>
                        <List size={'30px'} />
                    </button>
                </Container>
            </Navbar>
            {/* Off canvas */}
            <Offcanvas show={show} onHide={handleClose} style={{ "width": "200px", "backgroundColor": primaryBackground }}>
                <Offcanvas.Header className='d-flex justify-content-center' style={style4}> sensei code</Offcanvas.Header>
                <Offcanvas.Body className='d-flex justify-content-start flex-column mx-2'>
                    <hr className='text-danger' />
                    {/* Language Controller */}
                    <div className=" pt-2" >
                        <p style={style2} className="text-center">Language</p>
                        <Select
                            placeholder={`Filter By Category`}
                            options={languageOptions}
                            value={userLanguage}
                            onChange={selectedOption => setUserLanguage(selectedOption)} />
                    </div>
                    <hr className='text-danger' />

                    {/* Theme controller */}
                    <hr className='text-danger' />
                    <div className=" pt-2" >
                        <p style={style2} className="text-center">Theme</p>
                        <Select options={themes}
                            placeholder={`Select Theme`}
                            value={userTheme}
                            onChange={e => setUserTheme(e.value)} />
                    </div>
                    <hr className='text-danger' />

                    {/* Font Size Controller */}
                    <hr className='text-danger' />
                    <div className=" pt-2" >
                        <p style={style2} className="text-center">Font size</p>
                        <input type="range" min="10" max="30"
                            value={fontSize} step="2"
                            onChange={(e) => { setFontSize(e.target.value) }} />
                    </div>
                    <hr className='text-danger' />
                </Offcanvas.Body>
            </Offcanvas>
        </div >


    )
}

export default CompilerNavBar