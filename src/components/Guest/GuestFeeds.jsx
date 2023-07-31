import React from 'react'

function GuestFeeds() {
    return (
        <div>
            <div className="container" style={{ height: "100vh" }}>
                <div className="row">
                    {/* Nav bar */}
                    <div className="col-12 py-2 px-2 h-100">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className='px-2 text-lowercase'>
                                <h4>sensei code</h4>
                            </div>
                            <div>
                                <a href="/signin"><button className='mx-2 signIn'>Sign in</button></a>
                                <a href="/signup"><button className='mx-2 px-4 py-2 getStarted'>Get started</button></a>
                            </div>
                        </div>
                    </div>
                    {/* Home */}
                    <div className="col-12 col-md-5 d-flex bg-white flexCenter bg-success" style={{ height: "90vh" }}>
                        <div className='text-center homeText'>
                            <h1>Let's Learn </h1>
                            <h1>
                                <span className="hiLight">Something New</span>
                            </h1>
                            <h1>Today.</h1>
                        </div>
                    </div>
                    <div className="col-12 d-none d-md-flex col-md-7 flexCenter">
                        <div className='w-100 px-3'>
                            <img className='guestHomeImage' src="https://static.vecteezy.com/system/resources/previews/008/826/724/original/programmer-developer-engineer-with-laptop-sitting-at-the-office-desk-holding-a-pen-while-coding-and-developing-concept-illustration-free-vector.jpg" alt="" />
                        </div>
                    </div>
                    {/* Feeds */}
                    <div className="col-12">
                        <h1>Data coming</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuestFeeds