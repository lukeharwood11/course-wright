import AvatarEditor from "react-avatar-editor";
import {useEffect, useRef, useState} from "react";
import Dropzone, {useDropzone} from "react-dropzone";
import {Slider} from "@mui/material";
import toast from "react-hot-toast";

const ProfileImagePreview = ({ saveChanges }) => {


    const [image, setImage] = useState("")
    const [zoom, setZoom] = useState(1)
    const [borderRadius, setBorderRadius] = useState(0)
    const editor = useRef()
    const dropzoneRef = useRef()

    const handleSaveChanges = () => {
        try {
            const image = editor.current.getImage().toDataURL()
            saveChanges(image, borderRadius, zoom)
        } catch (err) {
            console.log(err)
        }

    }

    const open = () => {
        dropzoneRef.current.open()
    }

    return (
        <div className={"flex justify-center"}>
            <Dropzone
                ref={ dropzoneRef }
                onDropRejected={() => toast.error("Invalid file type.")}
                onDropAccepted={(files) => setImage(files[0])}
                maxFiles={1}
                noClick
                noKeyboard
            >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <AvatarEditor ref={editor}
                                      width={250}
                                      height={250}
                                      border={50}
                                      scale={zoom}
                                      borderRadius={borderRadius}
                                      image={image} />
                        <input {...getInputProps()} />
                        <button className={"w-full p-2 rounded-md bg-white drop-shadow-lg"} onClick={ open }>Select File</button>
                        <button className={"w-full p-2 mt-2 rounded-md drop-shadow-lg bg-white"} onClick={ handleSaveChanges }>Save Changes</button>
                        <label>Zoom</label>
                        <div className={"flex justify-center items-center"}>
                            <Slider
                                defaultValue={1}
                                onChange={(event, value, activeThumb) => setZoom(value)}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value}x`}
                                step={.1}
                                min={1}
                                max={3}
                            />
                        </div>
                        <label>Round Edges</label>
                        <div className={"flex justify-center items-center"}>
                            <Slider
                                defaultValue={1}
                                valueLabelDisplay={"off"}
                                onChange={(event, value, activeThumb) => setBorderRadius(value)}
                                step={.1}
                                min={0}
                                max={150}
                            />
                        </div>

                    </div>
                )}
            </Dropzone>
        </div>
    )
}

export default ProfileImagePreview