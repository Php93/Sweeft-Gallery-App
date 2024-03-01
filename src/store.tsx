import {create} from 'zustand'

interface IStore {
    input: string
    images: Array<any>
    pageIndex: number
    loading: boolean,
    updateLoading: (bool: boolean) => void
    updatePageIndex: (page: number) => void
    updateInput: (text: string) => void
    updateImages: (imagesArray: any) => void
}

export const useStore = create<IStore>((set) => ({
    input: '',
    images: [],
    pageIndex: 1,
    loading: false,
    updateLoading: (bool: boolean) => set({loading: bool}),
    updatePageIndex: (page) => set({pageIndex: page}),
    updateInput: (text) => set({input: text}),
    updateImages: (imagesArray) => set({images: imagesArray}),
}));