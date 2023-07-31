import React from 'react'
import Compailer from '../../components/Compiler/Compiler'
import { useOutletContext } from "react-router-dom";

function CompilerPage() {
    return (
        <div>
            <Compailer />
        </div>
    )
}

export default CompilerPage