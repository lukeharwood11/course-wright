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
            <div className={"border w-full border-black rounded-md p-2 mb-5 flex justify-center flex-col"}>
                <div className={"flex justify-center flex-col"} >
                    <div>
                        <h1 className={"text-1xl font-bold"}>Title</h1>
                        <input className="w-full rounded-md p-2" defaultValue={title} onChange={(event) => onTitleChange(section.id, event)}/>
                    </div>
                    <div>
                        <h1 className={"text-1xl font-bold"}>YouTube URL</h1>
                        <input className="w-full rounded-md p-2" defaultValue={src} onChange={(event) => onUrlChange(section.id, event)}/>
                    </div>
                    <div className={""}>
                        <h1 className={"text-1xl font-bold"}>Description</h1>
                        <Textarea className="w-full resize-none rounded-md p-2" defaultValue={text} onChange={(event) => onChange(section.id, event)}/>
                    </div>
                </div>
                <div className={"flex justify-center align-center"}>
                    <button onClick={onDelete} className="border border-black font-semibold transition-colors hover:bg-white hover:text-red-300 w-min h-min rounded-md m-2 px-4 py-2 bg-red-300 text-white">Delete</button>
                    <button onClick={() => {
                        console.log("SAVE!")
                        onSave(section.id, true)
                    }} className="font-semibold border border-black transition-colors hover:bg-white hover:text-blue-500 w-min h-min rounded-md m-2 px-4 py-2 bg-blue-500 text-white">Save</button>
                </div>
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
                <button onClick={() => onSave(section.id, false)} className="border border-black font-semibold transition-colors hover:bg-white hover:text-blue-500 w-full, h-3/4 rounded-md px-4 py-2 bg-blue-500 text-white">edit</button>
            </div>

        );
    }
    return editMode ? renderEditMode() : renderViewMode()
}

export default VideoElement;