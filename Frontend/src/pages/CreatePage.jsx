
import { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import api from "../libs/axios.js";
import toast from "react-hot-toast";

export default function CreatePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const Navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if(!title.trim() || !content.trim()){
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try{
      await api.post("/notes", 
        {title, content}
      );

      toast.success("Note created successfully!");
      Navigate("/");
    }
    catch(error){
      console.log("Failed to create note", error);

      if(error.response?.status === 429){
        toast.error("Too many request in short period", {
          duration: 4000,
        });

      }else{
        toast.error("Failed to create note");
      }
  
    }
    finally{
      setLoading(false);
    }

  }

  return (
    <div className="min-h-screen bg-base-200"> 
      
      <div className="container mx-auto px-4 py-8"> 
        <div className="max-w-2xl mx-auto"> 
          
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5"/>
            Back To Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4"> Create New Note </h2>
              
              <form onSubmit={handleSubmit}>
                <fieldset className="fieldset mb-4">

                  <label className="label">
                    <span className="label-text"> Title </span>
                  </label>
                  <input 
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <label className="label">
                    <span className="label-text"> Content </span>
                  </label>
                  <textarea 
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />

                </fieldset> 

                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            
            </div>
          </div>

        </div>
      </div>
    
    </div>
  )
}

