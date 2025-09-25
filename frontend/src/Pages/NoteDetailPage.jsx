import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router'
import api from '../lib/axios'
import toast, { LoaderIcon } from 'react-hot-toast'
import { Link } from 'react-router';
import { ArrowLeftIcon,Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {
  const [note, setnote] = useState(null);
  const [loading, setloading] = useState(true);
  const [saving, setsaving] = useState(false);

  const navigate = useNavigate()

  const{id} = useParams()

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`);
        setnote(res.data);
      } catch (error) {
        console.log('Error in fetching notes',error);
        toast.error('Failed to fetch note');
      }finally{
        setloading(false);
      }
    };
    fetchNote();
  },[id])

  const handleDelete = async () => {
    if(!window.confirm('Are your sure?')) return;
    toast.success('Note Deleted')
    navigate('/')
    try {
      await api.delete(`/notes/${id}`);
    } catch (error) {
      console.log('Error deleting note',error)
      toast.error('Failed to delete note')
    }
  };
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error('Please add title or content')
      return;
    }
    setsaving(true)
    try {
      await api.put(`/notes/${id}`, note)
      toast.success('Note Updated Successfully');
      navigate('/')
    } catch (error) {
      console.log('Error updating note',error)
      toast.error('Failed to update note')
    }finally{
      setsaving(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          
          <div className='flex items-center justify-between mb-6'>
            <Link to='/' className='btn btn-ghost'>
              <ArrowLeftIcon className='h-5 w-5'/>
              Back to Notes
            </Link>
            <button className='btn btn-error btn-outline' onClick={handleDelete}>
              <Trash2Icon className='h-5 w-5'/>
              Delete Note
            </button>
          </div>

          <div className="card bg-primary/20">
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input type="text" placeholder='Note Title' className='input input-bordered' value={note.title} 
                onChange={(e) => setnote({...note, title:e.target.value})}/>
              </div>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <input type="text" placeholder='Write your note here...' className='textarea textarea-bordered h-32' value={note.content} 
                onChange={(e) => setnote({...note, content:e.target.value})}/>
              </div>
              <div className="card-actions justify-end">
                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                  {saving ? 'Saving...':'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage