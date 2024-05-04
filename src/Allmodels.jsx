import axios from 'axios'
import { useState, useEffect } from 'react';

function Allmodels({ models, modelsDesc, modelsWords, cookie }) {
    const [update, setUpdate] = useState('')

    const finalModels = models;
    const modelsJSX = finalModels.map((model, index) => (
        <a href="/chat" key={index} className="className text-2xl flex flex-col bg-gray-200 w-2/3 p-8 hover:bg-gray-300 md:w-3/4 shadow-sm">
            <div className="flex space-x-2">
                <div className="font-bold text-2xl md:text-3xl text-zinc-800">{model.modelName}</div>
                <span className="text-sm self-center text-zinc-600">Created: 2025-10-05</span>
            </div>
            <div className="pl-5 text-lg md:textx">
                <span className="text-zinc-600">Frequent words: </span> {model.frequentWords}
            </div>
            <div className="pl-5 text-lg md:text-xl">
                <span className="text-zinc-600"> Description: </span>{model.modelDescription}
            </div>
            <div className="pl-5 text-lg md:text-xl">
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