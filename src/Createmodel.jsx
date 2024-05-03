import { useState, useEffect } from "react";
import axios from 'axios'
import Allmodels from './Allmodels.jsx'

function Create({ cookie }) {
    const [modelName, setModelName] = useState('')
    const [modelDescription, setModelDescription] = useState('')
    const [frequentWords, setFrequentWords] = useState('')
    const [models, setModels] = useState([])


    function editName(evt) {
        const name = evt.target.value
        setModelName(name)
        return name
    }
    function editDescription(evt) {
        const description = evt.target.value
        setModelDescription(description)
        return description
    }
    function editWords(evt) {
        const words = evt.target.value
        setFrequentWords(words)
        return words
    }


    async function createNewModel() {
        const header = document.getElementById('header')
        const namee = document.getElementById('namee')
        const descriptionn = document.getElementById('descriptionn')
        const response = await axios.post('http://localhost:3000/createmodel', { name: modelName, frequentWords: frequentWords, description: modelDescription, author: cookie })
        if (response.data.error === 'You must provide a name') {
            namee.classList.add('text-red-500')
            namee.classList.value = 'You must provide a name'
        }
        if (response.data.error === 'You must provide a description') {
            descriptionn.classList.add('text-red-500')
            descriptionn.classList.value = 'You must provide a description'
        }
        if (response.data.message) {
            header.classList.add('text-green-600')
            header.innerText = 'Create another model - Model created!'
        }
        else {
            header.classList.add('text-red-500')
            header.innerText = 'Create another model - error try again'
        }
    }

    const fetchIt = async () => {
        const response = await axios.post('http://localhost:3000/mymodels', { identity: cookie })
        const number = response.data.message.length
        const finalModels = []
        for (let i = 0; i < number; i++) {
            finalModels.push(response.data.message[i].modelName)
        }
        setModels(finalModels)
    }
    fetchIt()
    return (
        <div className="w-screen h-screen flex flex-col">
            <section className="h-fit flex flex-col border border-red-500">
                <div>Your models:</div>
                <div>Models here.. </div>
                <Allmodels models={models}/>
            </section>
            <section>
                <div></div>
                <div className="flex flex-col border border-green-500">
                    <h2 className="font-bold text-2xl h-1/5" id='header'>Create another model</h2>
                    <div className="border border-pink-500 h-4/5 flex flex-col">
                        <div className="w-full flex space-x-8"><h3>Name:</h3><input onChange={editName} className="border border-black rounded" type="text" placeholder="Billy" name="modelName" id='namee' /></div>
                        <div className="w-full flex space-x-8"><h3>Frequent words:</h3><input onChange={editWords} className="border border-black rounded" type="text" placeholder="dude,bro,when,ok, etc" name="frequentWords" id='wordss' /></div>
                        <div className="w-full flex space-x-8"><h3>Description:</h3><input onChange={editDescription} className="border border-black rounded" type="text" placeholder="Really like basketball" name="modelDescription" id='descriptionn' /></div>
                        <button onClick={createNewModel} className="border border-black py-2 px-7 w-1/4 mt-10">Create model</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Create;