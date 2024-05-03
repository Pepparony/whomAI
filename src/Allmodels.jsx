import axios from 'axios'
import { useState, useEffect } from 'react';

function Allmodels(allModels) {
    const [update, setUpdate] = useState('')

    const finalModels = allModels.models;
    const modelsJSX = finalModels.map((model, index) => (
        <div key={index}>
            <div className="text-green-500">{model}</div>
        </div>
    ));

    return (
        <div className="h-fit">
            {modelsJSX}
        </div>
    );
}

export default Allmodels;