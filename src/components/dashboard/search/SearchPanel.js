import Loading from "../../Loading";
import SearchResult from "./SearchResult";
import { AnimatePresence, motion } from "framer-motion";

const SearchPanel = ({ searchResults, searchLoading }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
                {
                    searchLoading ?
                        <Loading inverted key={"loading"}/> :
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={"flex flex-col items-center gap-2"} key="results">

                            {
                                searchResults &&
                                searchResults.map((r) => {
                                    return <SearchResult result={r} key={r.id}/>
                                })
                            }
                        </motion.div>
                }
        </motion.div>
    );
}

export default SearchPanel;