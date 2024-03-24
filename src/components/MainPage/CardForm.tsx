
import { CardType } from './CardList/Card/Card.types'
import {useState} from 'react'

type Props = {
  onSubmit: (values: CardType) => void,
  onDelete?: (key: number) => void
}

const CardForm = ({
  onSubmit,
  onDelete
}: Props): JSX.Element => {

  const [cardFormState, setCardFormState] = useState<CardType>({
    title: '',
    text: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setCardFormState({
      ...cardFormState,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    onSubmit(cardFormState)
  }

  return (
    <div className="card-body">
      <form className="form-group d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <input onChange={onChange} type="text" id={'title'} className="form-control" placeholder="Заголовок"/>
        <textarea onChange={onChange} rows={3} id={'text'} className="form-control" placeholder="Текст" />
        <div
          className='d-flex flex-row gap-2 justify-content-end'
        >
          <button className="btn btn-primary" type='submit'>Save</button>
          {onDelete && <button className="btn btn-danger">Delete</button>}
        </div>
      </form>
    </div>
  )
}

export {
  CardForm
}