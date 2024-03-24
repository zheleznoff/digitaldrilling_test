import { CardType } from './Card.types'
type Props = {
    card: CardType
}

const Card = ({ card }: Props): JSX.Element => {
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
                    className='d-flex justify-content-between'
                >
                    <div className='d-flex'>
                        <a href="#" className="card-link">Редактировать</a>
                        <a href="#" className="card-link">Удалить</a>
                    </div>
                    <div className='d-flex gap-2'>
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