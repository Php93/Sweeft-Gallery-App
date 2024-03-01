import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useStore } from '../store';

function History() {
  const navigate = useNavigate();
  const {updateInput, updatePageIndex, updateImages} = useStore()
  const history = JSON.parse(localStorage.getItem("history")!)
  const items: Array<string> = Array.from(new Set(history))
  
  const handleClick = (text: string) => {
    updateImages([])
    updatePageIndex(1)
    updateInput(text)
    navigate('/')
  }

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex justify-between mt-5'>
        <Link className='hover:underline' to={'/'}>{`<-`}Home</Link>
        <h1 className='text-xl font-bold'>History</h1>
        <div></div>
      </div>


      <div className='mt-10'>
        <h3 className='text-lg mb-3'>Requests:</h3>
        {items && items?.map((item: string) => (
          <div onClick={() => handleClick(item)} className='flex items-center gap-2 cursor-pointer'>
            <i className="fa fa-history text-lg"></i>
            <p className='text-lg'>{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History