import {BsInbox} from "react-icons/bs";
import React from "react";

const InboxIcon = ({ count }) => {
    const countText =
        count === 0 ? 0 :
            count > 9 ? "9+" : count
    return (
        <div className={"relative"}>
            <BsInbox className="text-blue-500" size={30}/>
            { count !== 0 && <p className={`inbox-count ${count > 9 ? "text-xs": "rounded-lg"}`}>{ countText }</p>}
        </div>
    )
}

export default InboxIcon;