import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const ACCESS_KEY = "AIeewmfycjoWRJ5HfjlbhI7BBqJtBqHDVALc3jQhJAQ";

const getImages = createAsyncThunk(
  'gallery/getImages',
  () => {
    return axios.get(`https://api.unsplash.com/photos/random?count=10&client_id=${ACCESS_KEY}`)
      .then(response => response.data)
  }
)


const initialState = {
  loading: false,
  error: null,
  images: [],
}

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    like: (state,action) => {
      const id = action.payload
      for (const page of state.images) {
        for (const obj of page) {
          if (obj.id === id) {
            obj.liked_by_user = !obj.liked_by_user
            if (obj.liked_by_user == true) {
              obj.likes++
            }
            else {
              obj.likes--
            }
            return; // If the ID is found, exit the function
          }
        }
      }
    }
  },
  extraReducers: (builder) => {
    // Get Images
    builder.addCase(getImages.pending, state => {
      state.loading = true
    })
    builder.addCase(getImages.fulfilled, (state, action) => {
      state.loading = false
      state.images.push(action.payload)
    })
    builder.addCase(getImages.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

// Action creators are generated for each case reducer function
const {like} = gallerySlice.actions
export { getImages, like }

export default gallerySlice.reducer