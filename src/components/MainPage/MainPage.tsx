import {CardList} from './CardList/CardList'
const MainPage = (): JSX.Element => {
    return (
        <div
            className="d-flex flex-column align-items-center"
        >
            <CardList/>
        </div>
    )
}

export {
    MainPage
}