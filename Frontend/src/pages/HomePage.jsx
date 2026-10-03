
import { useState, useEffect } from "react"
import api from "../lib/axios.js";
import toast from "react-hot-toast"

import Navbar from "../components/Navbar.jsx"
import RateLimitedUI from "../components/RateLimitedUI.jsx"
import NoteCard from "../components/NoteCard.jsx"
import NotesNotFound from "../components/NotesNotFound.jsx"

export default function HomePage() {
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchNotes = async() => {
        
        api.get("/notes")
          .then((res) => {
            console.log(res.data);
            setNotes(res.data);
            setIsRateLimited(false);  
          })
          .catch((error) => {
            if(error.response?.status == 429){
              setIsRateLimited(true)
            }
            else{
              toast.error("Failed To Load Notes");
            }
            console.error("Error Fetching Notes: ", error);
          })
          .finally(() => {
            setIsLoading(false);
          });

      }

      fetchNotes();
    }, []);

  return (
    <div className="min-h-screen"> 
      <Navbar/>
      {isRateLimited && <RateLimitedUI/>}

      <div className="max-w-6xl mx-auto mt-6 p-4">
        {isLoading && <div className="text-center text-primary text-2xl"> Loading <span className="lg: loading loading-dots loading-lg ml-5"></span> </div>}

        {!isLoading && notes.length === 0 && !isRateLimited && <NotesNotFound/>}

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>
   </div>
  )
}

