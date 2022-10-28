import {motion} from "framer-motion";
import React, {useEffect, useRef, useState} from "react";
import Logo from "../Logo";

import CreateAccountSlideBox, {AccountTypeSlide} from "../CreateAccountSlideBox";

import Loading from "../Loading";
import CreateAccountProvider from "../../context/CreateAccountContext";

const CreateAccountPage = () => {
    const [loading, setLoading] = useState(false)

    return (
            <CreateAccountProvider>
                { loading ? <Loading/> :
                <motion.div
                    initial={{ opacity: 0, y: "-1vh" }}
                    animate={{ opacity: 1, y:0 }}
                    transition={{ ease: "anticipate", duration: 1}}
                    exit={{opacity: 0, scale: 0}}
                    className={"overflow-hidden drop-shadow-lg h-full dialog bg-blue-500 items-center flex justify-center"}>
                    <Logo/>
                    <CreateAccountSlideBox setLoading={ setLoading }/>
                </motion.div>}
            </CreateAccountProvider>
    );
}

export default CreateAccountPage;