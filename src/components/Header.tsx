import { Link } from 'react-router-dom'
import Input from './Input';

function Header() {

  return (
    <div className='max-w-6xl mx-auto flex justify-between items-center py-4 mb-5'>
      <Link to={'/'}>
        <h1 className='text-lg font-bold tracking-tight'>Gallery App</h1>
      </Link>

      <div className='flex justify-center items-center flex-1'>
        <Input/>
      </div>

      <Link className='hover:underline' to={'/history'}>ისტორია</Link>
    </div>
  )
}

export default Header