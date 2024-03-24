import {ModalWindow} from '../ModalWindow'

export const Navbar = (): JSX.Element => {
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
                                    <li><span className="dropdown-item">По заголовку</span></li>
                                    <li><span className="dropdown-item">По тексту</span></li>
                                    <li><span className="dropdown-item">По дате</span></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <ModalWindow
                        buttonType='btn-outline-success'
                        buttonText='Добавить'
                    >
                        <div>content</div>
                    </ModalWindow>
                    {/* <button className="btn btn-outline-success" type="submit">Добавить</button> */}
                </div>
            </div>
        </nav>
    )
}