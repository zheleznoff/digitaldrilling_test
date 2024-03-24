import {Card} from './Card/Card'

const CardList = (): JSX.Element => {
    return (
        <div
            style={{
                width: '45%',
            }}
            className='d-flex flex-column gap-3 mt-2 mb-2'
        >
            <Card
                card={{
                    title: 'Заголовок',
                    text: 'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }}
            />
            <Card
                card={{
                    title: 'Заголовок',
                    text: 'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }}
            />
            <Card
                card={{
                    title: 'Заголовок',
                    text: 'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }}
            />
            <Card
                card={{
                    title: 'Заголовок',
                    text: 'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }}
            />
            <Card
                card={{
                    title: 'Заголовок',
                    text: 'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }}
            />
            <Card
                card={{
                    title: 'Заголовок',
                    text: 'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.\n ' +
                    'Some quick example text to build on the card title and make up the bulk of the cards content.',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }}
            />
        </div>
    )
}

export {
    CardList
}