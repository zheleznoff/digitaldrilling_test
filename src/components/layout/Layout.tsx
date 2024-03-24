import {memo} from 'react';
import {Navbar} from './Navbar/Navbar'

type Props = {
    children?: React.ReactNode
}

const Layout = ({children}: Props) => {
  return (
    <div
        className='d-flex flex-column min-vh-100'
    >
        <Navbar/>
        {children}
    </div>
  )
}

const memoizedLayout = memo(Layout)

export {
    memoizedLayout as Layout
}


export default Layout