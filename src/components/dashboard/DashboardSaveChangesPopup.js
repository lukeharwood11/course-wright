import { motion } from 'framer-motion'
const DashboardSaveChangesPopup = ({ handleClose }) => {
    return (
        <motion.div
            className={"flex flex-col justify-center items-center"}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={"save-changes"}>
            <h1 className={"text-center text-2xl"}>You have unsaved changes. <br/>Please save before leaving.</h1>
            <button onClick={ handleClose } className={"button bg-indigo-500 text-xl"}>OK</button>
        </motion.div>
    )
}

export default DashboardSaveChangesPopup;