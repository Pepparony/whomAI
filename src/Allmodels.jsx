import axios from 'axios'
import { useState, useEffect } from 'react';

function Allmodels(allModels) {
    const [update, setUpdate] = useState('')

    const finalModels = allModels.models;
    const numberLength = finalModels.length
    const modelsJSX = finalModels.map((model, index) => (
        <div key={index} className="flex">
            <div className="text-green-500">{model}</div>
            <a href="" className="text-blue-500 hover:underline hover:text-blue-600">Talk to this model</a>
        </div>
    ));

    return (
        <div className="h-fit flex">
            <div>{modelsJSX}</div>
        </div>
    );
}

export default Allmodels;