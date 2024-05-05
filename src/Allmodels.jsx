import axios from 'axios'
import { useState, useEffect } from 'react';

function Allmodels({ models, modelsDesc, modelsWords, cookie }) {
    const [update, setUpdate] = useState('')
    const finalModels = models;
    const modelsJSX = finalModels.map((model, index) => (
        <a href={`/chat/${model.modelName}/${model._id}`} key={index} className="className text-2xl flex flex-col bg-blue-200 w-2/3 p-8 hover:bg-blue-300 md:w-3/4 shadow-sm rounded-lg">
            <div className="flex flex-col space-y-2">
                <div className="font-bold text-2xl md:text-3xl text-zinc-900 text-center tracking-wide">{model.modelName}</div>
                <span className="text-sm self-start text-zinc-600">Created: 2025-10-05</span>
            </div>
            <div className="text-sm hidden md:inline my-1">
                <span className="text-zinc-600">Model #:</span>{model._id}
            </div>
            <div className="text-lg md:textx hidden md:inline my-1">
                <span className="text-zinc-600">Frequent words: </span> {model.frequentWords}
            </div>
            <div className="text-lg md:text-xl my-1">
                <span className="text-zinc-600"> Description: </span>{model.modelDescription}
            </div>
            <div className="text-lg md:text-xl hidden md:inline my-1">
                <span className="text-zinc-600"> Sample text: </span>{model.sampleText}
            </div>
        </a>
    ));

    if(models == []){
        return(
            <div>
                You do not have any models <a href="">create one</a>
            </div>
        )
    }



    return (
        <div className="h-fit grid grid-rows-2 gap-3 place-items-center md:grid-cols-2">
            {modelsJSX}
        </div>
    );
}

export default Allmodels;