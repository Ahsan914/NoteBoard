
import {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router";
import toast from "react-hot-toast"
import {ArrowLeftIcon, Trash2Icon} from "lucide-react"

import api from "../lib/axios.js";

export default function NoteDetailPage() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

  console.log({id});

  useEffect(()=>{
    const fetchNote = async() => {
      try{
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      }catch(error){
        console.log("Error in fetchNote", error);
        toast.error("Error fetching note");
      }finally{
        setLoading(false);
      }

    }

    fetchNote();
  }, [id]);

  console.log({note});

  const handleDelete = async() => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    try{
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/")
    }catch(error){
      console.Error("Error in handleDelete");
      toast.error("Failed to delete note");
    }
  }

  const handleSave = async(e) => {
    e.preventDefault();

    if(!note.title.trim() || !note.content.trim()){
      toast.error("All fields are required");
      return;
    }

    setSaving(true);

    try{
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully!");
      navigate("/");
    }
    catch(error){
      console.log("Failed to create note", error);

      if(error.response?.status === 429){
        toast.error("Too many request in short period", {
          duration: 4000,
        });

      }else{
        toast.error("Failed to update note");
      }
  
    }
    finally{
      setSaving(false);
    }

  }

  if(loading){
    return(
      <div className="min-h-screen bg-base-200 flex items-center justify-center"> 
        <div className="text-center text-primary text-2xl"> Loading <span className="lg:loading loading-dots loading-lg ml-5"></span> </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container px-4 py-8">
        
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="size-5"/>
            Back to Notes
          </Link>

          <button className="btn btn-error btn-outline" onClick={handleDelete}>
            <Trash2Icon className="size-5"/>
            Delete Note
          </button>
        </div>

        <div className="card bg-base-100">
            <div className="card-body">
              
              <form>
                <fieldset className="fieldset mb-4">

                  <label className="label">
                    <span className="label-text"> Title </span>
                  </label>
                  <input 
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) => setNote({...note, title: e.target.value})}
                  />

                  <label className="label">
                    <span className="label-text"> Content </span>
                  </label>
                  <textarea 
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={note.content}
                    onChange={ (e) => setNote({...note, content: e.target.value}) }
                  />

                </fieldset> 

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={saving} onClick={handleSave}>
                    {saving ? "Saving" : "Save Changes"}
                    {saving && <span className="loading loading-dots loading-sm"></span>}
                  </button>
                </div>
              </form>
            
            </div>
          </div>

      </div>
    </div>
  )
}

