import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import NoteCard from '../Components/NoteCard'
import RateLimitedUi from '../Components/RateLimitedUI.jsx'
import api from '../lib/axios'
import toast from 'react-hot-toast'
import NotesNotFound from '../Components/NotesNotFound'

const HomePage = () => {
  const [rateLimit, setrateLimit] = useState(false);
  const [notes, setnotes] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        console.log(res.data)
        setnotes(res.data)
        setrateLimit(false)
      } catch (error) {
        console.log("Error Fetching notes")
        if(error.response.status == 429){
          setrateLimit(true)
        }else{
          toast.error("Failed to load notes")
        }
      } finally {
        setloading(false)
      }
    };
    fetchNotes();
  },[])
  

  return (
    <div className='min-h-screen'>
      <Navbar />
      {rateLimit && <RateLimitedUi />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>
          Loading Notes...
          </div>}
          {notes.length === 0 && !rateLimit && <NotesNotFound />}
          {notes.length > 0 && !rateLimit && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map(note => (
                <NoteCard key={note._id} note={note} setNotes={setnotes}/>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}

export default HomePage