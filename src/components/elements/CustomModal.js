import { motion } from 'framer-motion'
const CustomModal = ({ fullHeight=false, close=false, handleClose, global, children }) => {
    return (
        <motion.section
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{ease: "backOut", duration: .5}}
            exit={{opacity: 0}}
            onClick={ handleClose } className={`${global ? "modal-background-global": "modal-background-local"}`}>
            <motion.div
                initial={{opacity: 0, y: "-50vh"}}
                animate={{opacity: 1, y: 0}}
                transition={{ease: "backOut", duration: .5}}
                exit={{ y: "-50vh" }}
                onClick={(e) => e.stopPropagation()}
                className={`modal-window ${fullHeight ? "h-full" : ""}`}>
                { children }
                {
                    close && <button className={"button text-white bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500"} onClick={ handleClose }>Close</button>
                }
            </motion.div>
        </motion.section>
    );
}

export default CustomModal;