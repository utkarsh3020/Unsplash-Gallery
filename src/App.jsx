import React, {useState, useEffect} from 'react';
import './App.css';
import { FaSearch } from 'react-icons/fa';
import Photo from './components/Photo';

const clientID = `?client_id=L17HMzIeuLQLZWAVhsGaX38HXLt3OqIc7j9NsqYGguE`
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {

  // Loading
  const [loading, setLoading] = useState(false)
  // photos
  const [photos, setPhotos] = useState([])
  // page
  const [page, setPage] = useState(1)
  // query
  const [query, setQuery] = useState("")

  const fetchImages = async() =>{
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`

    if(query){
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`
    }else{
      url = `${mainUrl}${clientID}${urlPage}`
    }

    try{
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhoto) => {
        if(query && page===1){
          return data.results
        }
        else if(query){
          return [...oldPhoto, ...data.results]
        }
        else{
          return [...oldPhoto , ...data]
        }
      })
    }catch(error){
      setLoading(false)
      console.log(error);
    }
  }

  useEffect(() =>{
    fetchImages();
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener('scroll',()=>{
      if(
        (!loading && window.innerHeight + window.screenY) >= document.body.scrollHeight - 2
      ){
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return ()=> window.removeEventListener('scroll' , event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages();
  }

  return (
    <main>
      <div className='logo'><span>U</span>nsplash <span>I</span>mages</div>
      <section className='search'>
        <form className='search-form'>
          <input className='form-input' type="text" placeholder='serach any picture...' value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className='photos'>
        <div className="photos-center">
          {
            photos.map((image , index)=> {
              return <Photo key={index} {...image} />
            })
          }
        </div>
      </section>
    </main>
  );
}

export default App;
