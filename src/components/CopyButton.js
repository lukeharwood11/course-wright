import React, {useState} from 'react'
import {motion} from "framer-motion";
import {RiFileCopyLine} from 'react-icons/ri'
import {AiOutlineCheck} from 'react-icons/ai'

const CopyButton = ({style, size="2em", onClick}) => {
    const [selected, setSelected] = useState(false)

    const handleClick = () => {
        setSelected(true)
    }

    return (
        <motion.button
            className={style}
            onClick={(e) => {
                handleClick()
                onClick()
                e.stopPropagation()
            }}
            whileTap={{rotate: 90}}
        >
            {selected ? <AiOutlineCheck size={size}/> : <RiFileCopyLine size={size}/> }
        </motion.button>
    );
}

export default CopyButton;