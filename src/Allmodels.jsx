import axios from 'axios'
import { useState, useEffect } from 'react';

function Allmodels({models}) {
    const [update, setUpdate] = useState('')
    const finalModels = models;
    const modelsJSX = finalModels.map((model, index) => (
        <a href={`/chat/${model.modelName}/${model._id}`} key={index} className="h-64 className text-2xl flex flex-col bg-blue-100 w-4/5 p-8 hover:bg-blue-300 md:w-3/4 shadow-sm rounded-lg overflow-hidden">
            <div className="flex space-x-2">
                <div className="font-bold text-3xl md:text-3xl text-zinc-900 tracking-wider">{model.modelName}</div>
                <span className="text-xs text-zinc-600 self-center">Created: 2025-10-05</span>
            </div>
            <div className="text-xs md:inline my-1">
                <span className="text-zinc-600">Model #:</span>{model._id}
            </div>
            <div className="text-lg md:textx hidden md:inline my-1">
                <span className="text-zinc-600">Frequent words: </span> {model.frequentWords}
            </div>
            <div className="text-lg md:text-xl my-1">
                <span className="text-zinc-600"> Description: </span>{model.modelDescription}
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