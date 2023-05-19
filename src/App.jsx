import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, like } from "./redux/galleryReducer";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://cdn-icons-png.flaticon.com/512/187/187891.png?w=740&t=st=1684490397~exp=1684490997~hmac=e81b32ab01fc4baf483f9e7c4d78bde77692678ae1870582baa082e3f22ec4f8"
                alt=""
              />
            </div>
            <div className="ml-4 text-white">
              <h1 className="text-lg font-semibold">Gallery</h1>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const PhotoGallery = () => {
  const pages = useSelector(state => state.gallery.images)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getImages())
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight === scrollHeight) {
        dispatch(getImages())
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="columns-1 md:columns-2 lg:columns-3 m-4">
        {pages.map((page, index) => (
          <div key={index}>
            {page.map((photo) => (
              <div key={photo.id} className="relative m-auto pb-4 justify-center transition-all duration-500 hover:bg-indigo-200 hover:p-4">
                <div className="absolute top-0 right-0">
                  <button onClick={() => dispatch(like(photo.id))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={"w-6 h-6 hover:text-red-700 hover:fill-red-700 " + (photo.liked_by_user ? "text-red-500 fill-red-500" : "text-red-300 fill-red-300")}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                  <p className="text-red-400">{photo.likes}</p>
                </div>

                <a href={photo.urls.small} target="_blank">
                  <img src={photo.urls.small} alt={photo.alt_description} className="rounded-lg w-full" />
                </a>
                <div className="mt-2">
                  <p className="text-lg font-semibold">{photo.user.name}</p>
                  <p className="text-gray-500 text-sm">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Navbar />
      <PhotoGallery />
    </div>
  );
};

export default App;

