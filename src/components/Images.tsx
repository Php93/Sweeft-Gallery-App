import { useCallback, useRef, useState } from "react"
import { useStore } from "../store"
import Modal from "./Modal"

function Images() {
    const {images, pageIndex, loading, updatePageIndex, updateLoading} = useStore()
    const [openModal, setOpenModal] = useState(false)
    const [id, setId] = useState('')
    const observer = useRef<IntersectionObserver | null>(null)

    // Infinite Scroll ფუნქციონალი
    const lastImage = useCallback((node: any) => {
        if(loading) return
        if(!node) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting) {
                if(!loading) {
                    updatePageIndex(useStore.getState().pageIndex+1)
                }
                updateLoading(true)
            }
        }, {threshold:1})
        observer.current.observe(node)
    }, [])
    
    const handleClick = (imageId: string) => {
        setOpenModal(true)
        setId(imageId)
    }
        
    return (
        <div>
            {openModal && <Modal imageId={id} setOpenModal={setOpenModal} />}
            <div className="max-w-6xl mx-auto mb-20">
                <div className="grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div key={image.id} className="max-h-80 bg-black">
                            <img
                                onClick={() => handleClick(image.id)}
                                ref={index == images.length-1 ? lastImage : null} 
                                className="w-full h-full object-cover cursor-pointer hover:opacity-75" 
                                src={image.urls.thumb} 
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                {loading && (
                    <p className="text-xl">Loading...</p>
                )}
            </div>
        </div>
  )
}

export default Images


// https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_ACCESS_KEY}&query=${value}&per_page=20