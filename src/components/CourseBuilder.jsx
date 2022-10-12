import React, {useState} from 'react'
import Textarea from 'react-expanding-textarea'

export const CourseBuilder = () => {
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
            {sections.map((section) => <CourseElement key={section.id} onSave={() => handleSave() } onDelete={() => handleDelete(section.id)} id={section.id}/>)}
            <button onClick={handleNew} className="border border-black font-semibold transition-colors hover:bg-blue-500 hover:text-white rounded-md px-4 py-2 m-2 bg-white text-blue-500">Add new</button>
        </div>
    );
}

const CourseElement = ({onDelete, onSave}) => {
    const [text, setText] = useState("")
    const [type, setType] = useState("normal")
    const [editMode, setEditMode] = useState(true)
    if (!editMode) {
        return (
            <div className="w-full" onClick={() => setEditMode(true)}>
                <div>
                    <p>
                        {text}
                    </p>
                </div>
            </div>
        );
    }

    const renderValue = (value, t) => {
        return t === type ? value : ""
    }
    return (
        <div className="flex items-center flex-col w-full">

            <Textarea defaultValue={text} onChange={(event) => setText(event.target.value)} className={`p-4 border-box resize-none mx-3 rounded-md bg-gray-100 ${renderValue("italic", "instructions")} w-3/4 border border-black ${renderValue("font-bold bg-blue-100 text-blue-500", "key")}`}/>
            <div className="button-bar">
                <form className="p-3 flex flex-col sm:justify-around w-full">
                    <div className="inline-block">
                        <input className="mr-2" onChange={(event) => setType(event.target.id)} type="radio" id="key" name="builder-type" defaultChecked={type === "key"} value="key"/>
                        <label className={`text-black inline-block ${renderValue("font-bold", "key")}`}>Key Point</label>
                    </div>
                    <div className="inline-block">
                        <input className="mr-2" onChange={(event) => setType(event.target.id)} type="radio" id="normal" name="builder-type" defaultChecked={type === "normal"} value="normal"/>
                        <label className={`text-black inline-block ${renderValue("font-bold", "normal")}`}>Normal Block</label>
                    </div>
                    <div className="inline-block">
                        <input className="mr-2" onChange={(event) => setType(event.target.id)} type="radio" id="instructions" defaultChecked={type === "instructions"} name="builder-type" value="instructions"/>
                        <label className={`text-black inline-block ${renderValue("font-bold", "instructions")}`} >Instructions Block</label>
                    </div>
                </form>
                <button onClick={onDelete} className="border border-black font-semibold transition-colors hover:bg-white hover:text-red-300 w-40 h-10 rounded-md m-2 px-4 py-2 bg-red-300 text-white">Delete</button>
                <button onClick={() => {
                    onSave()
                    if (text.trim() !== "") {
                        setEditMode(false)
                    }
                }} className="font-semibold border border-black transition-colors hover:bg-white hover:text-blue-500 w-40 h-10 rounded-md m-2 px-4 py-2 bg-blue-500 text-white">Save</button>
            </div>
        </div>
    );
}