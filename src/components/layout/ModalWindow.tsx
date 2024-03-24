
type Props = {
    showModal: boolean,
    toggleModal: () => void,
    buttonType?: string | undefined,
    buttonText: string,
    modalTitle?: string | undefined,
    children: JSX.Element
}

const ModalWindow = ({ showModal, toggleModal, buttonType, buttonText, modalTitle, children }: Props): JSX.Element => {

    return (
        <div>
            <button className={"btn " + buttonType ?? ''} onClick={toggleModal}>{buttonText}</button>
            {showModal && (
                <div className="modal">
                    <div className="modal__content">
                        <div className="modal__content__header">
                            <h5 className="card-title">{modalTitle ?? 'Заголовок'}</h5>
                            <span className="close" onClick={toggleModal}>&times;</span>
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};


export {
    ModalWindow
};
