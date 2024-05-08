import { useState } from "react";
import axios from 'axios'
import Allmodels from './Allmodels.jsx'
import Navbar from './Navbar.jsx'
import './createmodel.css'

function Create({ cookie }) {
    const [modelName, setModelName] = useState('')
    const [modelDescription, setModelDescription] = useState('')
    const [frequentWords, setFrequentWords] = useState('')
    const [sampleText, setSampleText] = useState('')
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
    function editSampleText(evt) {
        const texts = evt.target.value
        setSampleText(texts)
        return texts
    }


    async function createNewModel() {
        const header = document.getElementById('header')
        const namee = document.getElementById('namee')
        const wordss = document.getElementById('wordss')
        const samplee = document.getElementById('samplee')
        const descriptionn = document.getElementById('descriptionn')
        const response = await axios.post('http://localhost:3000/createmodel', { name: modelName, frequentWords: frequentWords, description: modelDescription, sampleText: sampleText, author: cookie })
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
            namee.value = ''
            descriptionn.value = ''
            wordss.value = ''
            samplee.value = ''
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
            finalModels.push(response.data.message[i])
        }
        setModels(finalModels)
    }
    fetchIt()
    return (
        <div className="flex flex-col font-main bg-[#fffffa] scroll-smooth">
            <section className="h-fit flex flex-col">
                <Navbar/>
                <Allmodels cookie={cookie} models={models}/>
            </section>
            <section className="place-self-center" id="create">
                <div className="flex flex-col w-full border border-gray-200 py-10">
                    <h2 className="font-bold text-2xl h-1/5 md:h-2/5 md:text-4xl" id='header'>Create another model</h2>
                    <div className="flex flex-col">
                        <div className="w-full flex space-x-8 md:text-xl lg:text-2xl"><h3>Name:</h3><input onChange={editName} className="border border-black rounded px-2 py-1" type="text" placeholder="Billy" name="modelName" id='namee' /></div>
                        <div className="w-full flex space-x-8 md:text-xl lg:text-2xl"><h3>Frequent words:</h3><input onChange={editWords} className="border border-black rounded px-2 py-1" type="text" placeholder="dude,bro,when,ok, etc" name="frequentWords" id='wordss' /></div>
                        <div className="w-full flex space-x-8 md:text-xl lg:text-2xl"><h3>Description:</h3><input onChange={editDescription} className="border border-black rounded px-2 py-1" type="text" placeholder="As detailed as possible" name="modelDescription" id='descriptionn' /></div>
                        <div className="w-full flex space-x-8 md:text-xl lg:text-2xl"><h3>Sample text:</h3><input onChange={editSampleText} className="border border-black rounded px-2 py-1" type="text" placeholder="Insert messages / essay" name="modelSampleText" id='samplee' /></div>
                        <button onClick={createNewModel} className="py-2 px-6 w-full mt-10 bg-blue-400 hover:bg-blue-500">Create model</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Create;