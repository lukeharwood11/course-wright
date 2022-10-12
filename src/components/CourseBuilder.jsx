import React, {useState} from 'react'
import Textarea from 'react-expanding-textarea'
import TextElement from "./TextElement";
import VideoElement from "./VideoElement";
import CodeElement from "./CodeElement";

const CourseBuilder = () => {
    const [sections, setSections] = useState([])
    const [id, setId] = useState(-1)

    const handleDelete = (id) => {
        const newSections = sections.filter((section)=> section.id !== id)
        setSections(newSections)
    }

    const handleNewText = (event) => {
        if (event.shiftKey) {
            // display menu
        }
        const newId = id + 1
        setId(newId)
        setSections([...sections, {id: newId, type: "text", text: "", textType: "normal", editMode: true}])
    }

    const handleNewVideo = (event) => {
        if (event.shiftKey) {
            // display menu
        }
        const newId = id + 1
        setId(newId)
        setSections([...sections, {id: newId, type: "video", src: "", text: "", title: "", editMode: true}])
    }

    const handleNewCode = (event) => {
        if (event.shiftKey) {
            // display menu
        }
        const newId = id + 1
        setId(newId)
        setSections([...sections, {id: newId, type: "code", text: "", editMode: true}])
    }

    const handleSave = (id, exitEditMode) => {
        const s = [...sections]
        console.log(!exitEditMode)
        s.find(section => section.id === id).editMode = !exitEditMode
        console.log(s)
        setSections(s)
    }

    const handleChange = (id, event) => {
        console.log(event, id)
        const s = [...sections]
        s.find(section => section.id === id).text = event.target.value
        console.log(s)
        setSections(s)
    }

    const handleTextTypeChanged = (id, event) => {
        console.log(event, id)
        const s = [...sections]
        s.find(section => section.id === id).textType = event.target.value
        console.log(s)
        setSections(s)
    }

    const handleVideoTitleChanged = (id, event) => {
        console.log(event, id)
        const s = [...sections]
        s.find(section => section.id === id).title = event.target.value
        console.log(s)
        setSections(s)
    }

    const handleVideoUrlChanged = (id, event) => {
        console.log(event, id)
        const s = [...sections]
        s.find(section => section.id === id).src = event.target.value
        console.log(s)
        setSections(s)
    }

    return (
        <div className="p-3 mt-3 rounded-md w-1/2 bg-gray-100 flex items-center justify-center flex-col h-min">
            {false && <h1 className="p-4 text-white text-5xl font-bold">Welcome to the Course Builder</h1>}
            {sections.map((section) => {
                switch (section.type) {
                    case "code":
                        return <CodeElement onChange={handleChange} section={section} key={section.id} onSave={handleSave} onDelete={() => handleDelete(section.id)} id={section.id}/>
                    case "video":
                        return <VideoElement section={section} onChange={handleChange} onTitleChange={handleVideoTitleChanged} onUrlChange={handleVideoUrlChanged} key={section.id} onSave={handleSave} onDelete={() => handleDelete(section.id)} id={section.id}/>
                    case "text":
                        return <TextElement onTextTypeChange={handleTextTypeChanged} onChange={handleChange} section={section} key={section.id} onSave={handleSave} onDelete={() => handleDelete(section.id)} id={section.id}/>
                    default:
                        return
                }
            })}
            <div>
                <button onClick={handleNewText} className="border border-black font-semibold transition-colors hover:bg-blue-500 hover:text-white rounded-md px-4 py-2 m-2 bg-white text-blue-500">Add Text</button>
                <button onClick={handleNewVideo} className="border border-black font-semibold transition-colors hover:bg-blue-500 hover:text-white rounded-md px-4 py-2 m-2 bg-white text-blue-500">Add Video</button>
                <button onClick={handleNewCode} className="border border-black font-semibold transition-colors hover:bg-blue-500 hover:text-white rounded-md px-4 py-2 m-2 bg-white text-blue-500">Add Code</button>
            </div>
        </div>
    );
}

export default CourseBuilder;