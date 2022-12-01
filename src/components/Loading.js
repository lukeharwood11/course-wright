import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Logo from './Logo'
import { motion } from 'framer-motion'

const Loading = ({ spinner=false, inverted=false }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={ `flex justify-center items-center w-full h-full ${inverted ? "bg-white" : "bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500"}`} >
            {!spinner && <Logo loading={true} /> }
            {spinner && <AiOutlineLoading3Quarters className={ `animate-spin ${inverted ? "text-indigo-500" : "text-white"}` } size={ 100 } />}
        </motion.div>
    )
}

export default Loading;