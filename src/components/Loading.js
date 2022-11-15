import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Logo from './Logo'

const Loading = ({ spinner=false, inverted=false }) => {
    return (
        <div className={ `flex justify-center items-center w-full h-full ${inverted ? "bg-white" : "bg-blue-500"}`} >
            {!spinner && <Logo loading={true} /> }
            {spinner && <AiOutlineLoading3Quarters className={ `animate-spin ${inverted ? "text-blue-500" : "text-white"}` } size={ 100 } />}
        </div>
    )
}

export default Loading;