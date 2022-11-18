import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Logo from './Logo'

const Loading = ({ spinner=false, inverted=false }) => {
    return (
        <div className={ `flex justify-center items-center w-full h-full ${inverted ? "bg-white" : "bg-gradient-to-tr from-indigo-400 via-blue-500 to-purple-500"}`} >
            {!spinner && <Logo loading={true} /> }
            {spinner && <AiOutlineLoading3Quarters className={ `animate-spin ${inverted ? "text-indigo-500" : "text-white"}` } size={ 100 } />}
        </div>
    )
}

export default Loading;