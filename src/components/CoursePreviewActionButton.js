
const CoursePreviewActionButton = ({ disabled=false, icon, text, onClick }) => {
    return (
        <button onClick={ onClick } disabled={disabled}>
            {icon}
            <h1>{text}</h1>
        </button>
    )
}

export default CoursePreviewActionButton