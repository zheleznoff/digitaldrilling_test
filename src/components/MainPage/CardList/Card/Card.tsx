import { useContext, useState } from 'react';
import { IndexedDBContext } from '../../../../providers/IndexedDBProvider'
import { ModalWindow } from '../../../layout/ModalWindow'
import { ExistedCardType } from './Card.types';
import { CardForm } from '../../CardForm'
type Props = {
    card: ExistedCardType
}

const Card = ({ card }: Props): JSX.Element => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const { updateRecord,deleteRecord } = useContext(IndexedDBContext);
    return (
        <div
            className="card"
        >
            <div
                className="card-body"
                style={{
                    width: '100%',
                }}
            >
                <h5 className="card-title">{card.title}</h5>
                <p
                    className="card-text"
                >
                    {card.text}
                </p>
                <div
                    className='d-flex justify-content-between align-items-center card__footer gap-3'
                >
                    <div className='d-flex gap-2'>
                        <ModalWindow
                            showModal={showModal}
                            toggleModal={toggleModal}
                            buttonType='btn-secondary'
                            buttonText='Редактировать'
                            modalTitle='Редактирование заметки'
                        >
                            <CardForm
                                cardItem={card}
                                onSubmit={(values) => {
                                    updateRecord(card.id,values).then(() => toggleModal())
                                }}
                            />
                        </ModalWindow>
                        <button
                            className='btn btn-danger'
                            onClick={() => {
                                deleteRecord(card.id).then(() => toggleModal())
                            }}
                        >
                            Удалить
                        </button>
                    </div>
                    <div className='d-flex gap-2 flex-row card__dates'>
                        <span className='text-muted'>
                            {`Создано: ${card.createdAt.toLocaleString()}`}
                        </span>
                        <span className='text-muted'>
                            {`Обновлено: ${card.updatedAt.toLocaleString()}`}
                        </span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export {
    Card
}