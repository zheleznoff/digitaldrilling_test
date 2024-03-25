import { Card } from './Card/Card'
import { useContext } from 'react'
import { IndexedDBContext } from '../../../providers/IndexedDBProvider';
import { ExistedCardType } from './Card/Card.types'

const CardList = (): JSX.Element => {
    const { providerData: { data } } = useContext(IndexedDBContext);

    if (data?.length === 0) {
        return (<div>Заметок на данный момент нет</div>)
    }
    return (
        <div
            className='d-flex flex-column gap-3 mt-2 mb-2 card_list'
        >
            {data.map((card: ExistedCardType) => (
                <Card
                    key={card.id}
                    card={card}
                />
            ))}
        </div>
    )
}

export {
    CardList
}