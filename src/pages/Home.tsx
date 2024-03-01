import Header from '../components/Header'
import Images from '../components/Images'
import { useStore } from '../store'
import { useEffect } from 'react'
import axios from 'axios'

function Home() {
  const {images, input, pageIndex, updateImages} = useStore()

  useEffect(() => {
    if(input == "") {
      axios.get(`https://api.unsplash.com/photos?client_id=${process.env.REACT_APP_ACCESS_KEY}&order_by=popular&per_page=20&page=${pageIndex}`)
        .then((res) => updateImages([...images, ...res.data]))
    }
  }, [pageIndex, input])
  
  return (
    <div>
      <Header/>
      <Images />
    </div>
  )
}

export default Home