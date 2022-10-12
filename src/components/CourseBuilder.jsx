import React, {useState} from 'react'
import Textarea from 'react-expanding-textarea'
import TextElement from "./TextElement";

const CourseBuilder = () => {
    const [sections, setSections] = useState([])
    const [id, setId] = useState(-1)

    const handleDelete = (id) => {
        const newSections = sections.filter((section)=> section.id !== id)
        setSections(newSections)
    }

    const handleNew = (event) => {
        if (event.shiftKey) {
            // display menu
        }
        const newId = id + 1
        setId(newId)
        setSections([...sections, {id: newId}])
    }

    const handleSave = () => {

    }

    return (
        <div className="p-3 mt-3 rounded-md w-1/2 bg-gray-100 flex items-center justify-center flex-col h-min">
            {false && <h1 className="p-4 text-white text-5xl font-bold">Welcome to the Course Builder</h1>}
            {sections.map((section) => <TextElement key={section.id} onSave={() => handleSave() } onDelete={() => handleDelete(section.id)} id={section.id}/>)}
            <button onClick={handleNew} className="border border-black font-semibold transition-colors hover:bg-blue-500 hover:text-white rounded-md px-4 py-2 m-2 bg-white text-blue-500">Add new</button>
        </div>
    );
}

export default CourseBuilder;