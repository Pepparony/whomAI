import { useState } from "react";
import axios from 'axios'
import Allmodels from './Allmodels.jsx'
import Navbar from './Navbar.jsx'

function Create({ cookie }) {
    const [modelName, setModelName] = useState('')
    const [modelDescription, setModelDescription] = useState('')
    const [frequentWords, setFrequentWords] = useState('')
    const [sampleText, setSampleText] = useState('')
    const [models, setModels] = useState([])
    const [description, setDescription] = useState([])
    const [words, setWords] = useState([])


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
        const finalDesc = []
        const finalWords = []
        for (let i = 0; i < number; i++) {
            finalModels.push(response.data.message[i])
            finalDesc.push(response.data.message[i].modelDescription)
            finalWords.push(response.data.message[i].frequentWords)
        }
        setModels(finalModels)
        setDescription(finalDesc)
        setWords(finalWords)
    }
    fetchIt()
    return (
        <div className="flex flex-col font-main bg-gray-100 h-screen">
            <section className="h-fit flex flex-col">
                <Navbar/>
                <Allmodels cookie={cookie} modelsWords={words} modelsDesc={description} models={models}/>
            </section>
            <section className="place-self-center">
                <div className="flex flex-col w-full">
                    <h2 className="font-bold text-2xl h-1/5 md:h-2/5 md:text-4xl" id='header'>Create another model</h2>
                    <div className="h-4/5 flex flex-col">
                        <div className="w-full flex space-x-8 md:text-xl lg:text-2xl"><h3>Name:</h3><input onChange={editName} className="border border-black rounded px-2 py-1" type="text" placeholder="Billy" name="modelName" id='namee' /></div>
                        <div className="w-full flex space-x-8 md:text-xl lg:text-2xl"><h3>Frequent words:</h3><input onChange={editWords} className="border border-black rounded px-2 py-1" type="text" placeholder="dude,bro,when,ok, etc" name="frequentWords" id='wordss' /></div>
                        <div className="w-full flex space-x-8 md:text-xl lg:text-2xl"><h3>Description:</h3><input onChange={editDescription} className="border border-black rounded px-2 py-1" type="text" placeholder="Really like basketball" name="modelDescription" id='descriptionn' /></div>
                        <div className="w-full flex space-x-8 md:text-xl lg:text-2xl"><h3>Sample text:</h3><input onChange={editSampleText} className="border border-black rounded px-2 py-1" type="text" placeholder="Insert messages / essay" name="modelSampleText" id='samplee' /></div>
                        <button onClick={createNewModel} className="py-2 px-6 w-fit mt-10 bg-blue-400 rounded-lg">Create model</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Create;