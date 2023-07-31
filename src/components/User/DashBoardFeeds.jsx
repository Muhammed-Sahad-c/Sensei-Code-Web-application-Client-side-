import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Question, Code } from 'react-bootstrap-icons';
import homeVectorImage from '../../assets/images/userdashboard iamge.png'

function DashBoardFeeds() {
    const state = useSelector(state => { return state });
    const { user } = state;

    const [description, setDescription] = useState("");

    const { primaryColor } = state.themeStyle;
    const style2 = { color: primaryColor };

    const setExpalination = text => setDescription(text);
    const removeExpaination = () => setDescription("");

    return (
        <div style={{ height: "100vh" }}> 
            <div className="container" >
                <div className="row pt-5">
                    <div className="col-12 col-md-7 d-flex justify-content-start " style={style2}>
                        <div className='d-flex justify-content-start align-items-center '>
                            <div className='pt-5'>
                                <h3 className='pb-2 homeHeading'>Hai {user.userName},</h3>
                                <h5 className="pb-2 homeDiscription">Welcome to Sensei Code.
                                    We help you to track your progress.A public platform building the definitive collection of coding questions & answers
                                    We hope you will continue to learn with us.</h5>
                                <div className=' my-5'>
                                    <div className='featureBox d-flex justify-content-start align-items-center'>
                                        <a href="/qasession"
                                            onMouseEnter={() => setExpalination('A community-based space to find and contribute answers to technical challenges, and one of the most popular websites in the world.')}
                                            onMouseLeave={() => removeExpaination()}>
                                            <div
                                                className="px-2 py-2 featureContents">
                                                <Question size={'30px'} />
                                            </div>
                                        </a>
                                        <a href="/compiler"
                                            className='mx-3'
                                            onMouseEnter={() => setExpalination(`We believe coding should be accessible to all. So we made our own compilers for web and mobile. And it's free!`)}
                                            onMouseLeave={() => removeExpaination()}>
                                            <div
                                                className="px-2 py-2 featureContents">
                                                <Code size={'30px'} />
                                            </div>
                                        </a>
                                    </div>
                                    {/*  */}
                                </div>
                                <div style={{ "position": "relative" }} className="py-5">
                                    <small className='pl-3 tool'>{description}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-md-block col-4 d-flex justify-content-center align-items-center">
                        <div className=' overviewOuter'>
                            <img src={homeVectorImage} alt="not found!" className='w-100' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardFeeds