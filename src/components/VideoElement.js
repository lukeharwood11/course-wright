import React from "react";
import Textarea from "react-expanding-textarea";


const VideoElement = ({onChange, onUrlChange, onTitleChange, onSave, onDelete, section}) => {
    const {src, title, text, editMode} = section
    console.log(section)
    const parseUrl = () => {
        if (src !== "") {
            const split = src.split("=")
            console.log(split[split.length-1])
            return split[split.length - 1]
        }
        return undefined
    }

    const renderEditMode = () => {
        return (
            <div>
                <div className={"flex justify-center flex-col"} >
                    <h1 className={"text-4xl text-center"}>Title</h1>
                    <input className="w-full" defaultValue={title} onChange={(event) => onTitleChange(section.id, event)}/>
                    <h1 className={"text-4xl text-center"}>YouTube URL</h1>
                    <input className="w-full" defaultValue={src} onChange={(event) => onUrlChange(section.id, event)}/>
                    <h1 className={"text-4xl text-center"}>Description</h1>
                    <Textarea className="w-full" defaultValue={text} onChange={(event) => onChange(section.id, event)}/>
                </div>
                <button onClick={onDelete} className="border border-black font-semibold transition-colors hover:bg-white hover:text-red-300 w-40 h-10 rounded-md m-2 px-4 py-2 bg-red-300 text-white">Delete</button>
                <button onClick={() => {
                    console.log("SAVE!")
                    onSave(section.id, true)
                }} className="font-semibold border border-black transition-colors hover:bg-white hover:text-blue-500 w-40 h-10 rounded-md m-2 px-4 py-2 bg-blue-500 text-white">Save</button>
            </div>
        );
    }

    const renderViewMode = () => {
        const vidUrl = parseUrl()
        return  (
            <div className="rounded-lg font-bold bg-white p-2 flex justify-center flex-col">
                {title && <h1 className={"text-4xl text-center"}>{title}</h1>}
                {vidUrl && <iframe className="" width="560" height="315" src={`https://www.youtube.com/embed/${vidUrl}`}
                                  title="YouTube video player" frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen></iframe>}
                {text && <div className={"bg-white rounded-lg p-2"}><p>{text}</p></div>}
                <button onClick={onDelete} className="border border-black font-semibold transition-colors hover:bg-white hover:text-red-300 w-full, h-3/4 rounded-md px-4 py-2 bg-red-300 text-white">delete</button>
                <button onClick={() => onSave(section.id, false)} className="border border-black font-semibold transition-colors hover:bg-white hover:text-blue-500 w-full, h-3/4 rounded-md px-4 py-2 bg-blue-500 text-white">edit</button>
            </div>

        );
    }
    return editMode ? renderEditMode() : renderViewMode()
}

export default VideoElement;