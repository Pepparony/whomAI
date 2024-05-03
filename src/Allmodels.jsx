import axios from 'axios'
import { useState, useEffect } from 'react';

function Allmodels(allModels) {
    const [update, setUpdate] = useState('')

    const finalModels = allModels.models;
    const numberLength = finalModels.length
    const modelsJSX = finalModels.map((model, index) => (
        <div key={index} className="flex flex-col">
            <div className="text-zinc-800 text-2xl font-bold flex space-x-4">
                <div>{model}</div>
                <span className="text-zinc-700 text-sm self-end">created by you</span>
            </div>
            <div className="flex">
                <div className="pl-5">

                </div>
            <a href="" className="text-blue-500 hover:underline hover:text-blue-600">Talk to this model</a>
            </div>
        </div>
    ));

    return (
        <div className="h-fit flex">
            <div>{modelsJSX}</div>
        </div>
    );
}

export default Allmodels;