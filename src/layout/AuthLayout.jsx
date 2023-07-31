import React from 'react'
import '../assets/styles/Auth.css'
import { Outlet } from 'react-router-dom'
function AuthLayout() {
    return (
        <div>
            <div className="container" style={{height:'100vh'}}>
                <div className="row flexCenter" style={{height:'100vh'}}>
                    <div className="col-12 col-md-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout