import axios from "axios"
import { useStore } from "../store"
import { useEffect, useState } from "react"

type Props = {
    imageId: string
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function Modal({imageId, setOpenModal}: Props) {
    const {images} = useStore()
    const image: any = images.filter((image) => image.id == imageId)[0]
    const [data, setData] = useState<any>({})

    useEffect(() => {
        async function getData() {
            await axios.get(`https://api.unsplash.com/photos/${imageId}/statistics?client_id=${process.env.REACT_APP_ACCESS_KEY}`)
                .then(r => r.data)
                .then(data => setData(data))
        }

        getData()
    }, [])

    return (
    <div className="relative z-10">
        <div onClick={() => setOpenModal(false)} className="fixed inset-0 bg-gray-900 opacity-80 transition-opacity"></div>

        <div className="fixed inset-0 z-10 max-w-3xl mx-auto overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                    <img className="w-full max-h-[calc(100vh/1.5)] object-cover" src={image?.urls?.regular}/>

                    <div className="flex justify-between px-5 py-8">
                        <div className="flex items-center gap-1">
                            <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                            <p>Likes: {image.likes}</p>
                        </div>

                        <div className="flex items-center gap-1">
                            <i className="fa fa-download" aria-hidden="true"></i>
                            <p>Downloads: {data?.downloads?.total}</p>
                        </div>

                        <div className="flex items-center gap-1">
                            <i className="fa fa-eye" aria-hidden="true"></i>
                            <p>Seen: {data?.views?.total}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal