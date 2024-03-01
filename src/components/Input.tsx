import useSWR from 'swr';
import { useDebounce } from 'use-debounce';
import { useStore } from '../store';

function Input() {
    const {input, images, pageIndex, updateInput, updateImages, updateLoading} = useStore()
    // 1 წამის შემდაგ ანახლებს value-ს, რომ შევამციროთ API მოთხოვნები
    let [value] = useDebounce<string>(input, 1000);
    const history = localStorage.getItem("history")
    const items = history ? JSON.parse(history) : []
    let newArray = JSON.stringify([...items, value])
    
    // მონაცემების ჩატვირთვა
    useSWR(
        value.length != 0 ? `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_ACCESS_KEY}&query=${value}&per_page=20&page=${pageIndex}` : null,
        (url: any) => fetch(url)
            .then(r => r.json())
            .then(data => updateImages([...images, ...data.results]))
            .finally(() => {
                if(value != '') {
                    localStorage.setItem('history', newArray)
                }
                updateLoading(false)
            }),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    function handleChange(text: string) {
        updateImages([])
        updateInput(text)
    }
    
  return (
    <input 
        value={input} 
        onChange={(e) => handleChange(e.target.value)} 
        className='text-center w-1/2 py-2 px-4 rounded-full border border-gray-300' 
        placeholder='ძებნა'
    />
  )
}

export default Input