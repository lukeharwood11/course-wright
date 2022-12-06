import CustomModal from "../elements/CustomModal";

const ConfirmationDialog = ({ handleClose, confirmText, onConfirm, onCancel }) => {
    return (
        <CustomModal mandatoryResponse handleClose={ handleClose } >
            <h1 className={"text-center text-lg mb-5"}>{ confirmText }</h1>
            <div className={"flex text-xl gap-3"}>
                <button
                    className={"p-2 rounded-lg bg-white drop-shadow-lg"}
                    onClick={ () => {
                        onConfirm()
                        handleClose()
                    } }>
                    Confirm
                </button>
                <button
                    className={"p-2 rounded-lg bg-gray-300"}
                    onClick={ () => {
                        onCancel()
                        handleClose()
                    } }>
                    Cancel
                </button>
            </div>
        </CustomModal>
    )
}

export default ConfirmationDialog