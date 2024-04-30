import { useState, useEffect } from "react";

function Create() {
    const [modelName, setModelName] = useState('')
    const [modelDescription, setModelDescription] = useState('')
    const [frequentWords, setFrequentWords] = useState('')


    function editName() {
        const name = evt.target.value
        setModelName(name)
        return name
    }
    function editDescription() {
        const description = evt.target.value
        setModelDescription(description)
        return description
    }
    function editWords() {
        const words = evt.target.value
        setFrequentWords(words)
        return words
    }

    function createNewModel() {
        
    }

    return(
        <div className="w-screen h-screen flex flex-col">
            <section className="h-1/5 flex flex-col border border-red-500">
                <div>Your models:</div>
                <div>Models here.. </div>
            </section>
            <section>
                <div></div>
                <div className="flex flex-col border border-green-500">
                    <h2 className="font-bold text-2xl h-1/5">Create another model</h2>
                    <div className="border border-pink-500 h-4/5 flex flex-col">
                        <div className="w-full flex space-x-8"><h3>Name:</h3><input onChange={editName} className="border border-black rounded" type="text" placeholder="Billy"/></div>
                        <div className="w-full flex space-x-8"><h3>Frequent words:</h3><input onChange={editWords} className="border border-black rounded" type="text" placeholder="dude,bro,when,ok, etc"/></div>
                        <div className="w-full flex space-x-8"><h3>Description:</h3><input onChange={editDescription} className="border border-black rounded" type="text" placeholder="Really like basketball"/></div>
                        <button className="border border-black py-2 px-7 w-1/4 mt-10">Create model</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Create;