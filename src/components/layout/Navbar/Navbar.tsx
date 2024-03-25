import { useContext,useState } from 'react'
import { IndexedDBContext } from '../../../providers/IndexedDBProvider';
import { ModalWindow } from '../ModalWindow'
import { CardForm } from '../../MainPage/CardForm'
import { CardType } from '../../MainPage/CardList/Card/Card.types'


export const Navbar = (): JSX.Element => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const {addRecord, reorderBy, providerData: { sortingBy }} = useContext(IndexedDBContext);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top mb-1">
            <div className="container-fluid">
                <span className="navbar-brand">Заметки</span>
                <div className='d-flex gap-2'>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Сортировать
                                </span>
                                <ul className="dropdown-menu">
                                    <li onClick={() => reorderBy('title')}><span className={"dropdown-item" + (sortingBy === 'title' ? ' active' : '')}>По названию</span></li>
                                    <li onClick={() => reorderBy('createdAt')}><span className={"dropdown-item" + (sortingBy === 'createdAt' ? ' active' : '') }>По дате создания</span></li>
                                    <li onClick={() => reorderBy('updatedAt')}><span className={"dropdown-item" + (sortingBy === 'updatedAt' ? ' active' : '') }>По дате редактирования</span></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <ModalWindow
                        buttonType='btn-outline-success'
                        buttonText='Добавить'
                        showModal={showModal}
                        toggleModal={toggleModal}
                    >
                        <CardForm
                            onSubmit={(values: CardType) => {
                                addRecord(values)
                                    .then(() => toggleModal())
                                    .catch(err => alert(err))
                            }}
                        />
                    </ModalWindow>
                </div>
            </div>
        </nav>
    )
}