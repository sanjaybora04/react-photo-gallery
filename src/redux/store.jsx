import {configureStore} from '@reduxjs/toolkit'
import galleryReducer from './galleryReducer'


export default configureStore({
    reducer: {
        gallery: galleryReducer
    }
})