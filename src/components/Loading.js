import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Logo from './Logo'

const Loading = ({ withLogo=false }) => {
    return (
        <div className={ "flex justify-center items-center w-full h-full bg-blue-500"} >
            <Logo loading={true} />
            {withLogo && <AiOutlineLoading3Quarters className={ "animate-spin text-white" } size={ 100 } />}
        </div>
    )
}

export default Loading;