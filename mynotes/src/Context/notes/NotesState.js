import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  // const [notes, setNotes] = useEffect(notesInitial)
  const [notes, setNotes] = useState(notesInitial);

  // get all note
  const getNotes = async () => {
    // Calling Api 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ZWQ2ZGVmMTk2OTU3ZmU4YzRkNzBmIn0sImlhdCI6MTcwMzA5MzYzNn0.frGaCDPtDkIb22lXGIMMuaM06HojPR0PvMMvCCS1hB8"
      },
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
    console.log("fetched",json)
  }

  // add a note
  const addNote = async (title, tag, description) => {
    // console.log("working")
    // Calling Api 
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ZWQ2ZGVmMTk2OTU3ZmU4YzRkNzBmIn0sImlhdCI6MTcwMzA5MzYzNn0.frGaCDPtDkIb22lXGIMMuaM06HojPR0PvMMvCCS1hB8"
      },
      body: JSON.stringify({title, tag, description}),
    });
    const json = await response.json();
    
    //logic
    // const note = {
    //   "_id": "658a1d4979f2796e024e25c4",
    //   "user": "657ed6def196957fe8c4d70f",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2023-12-26T00:24:41.339Z",
    //   "__v": 0
    // };
    setNotes(notes.concat(json))
    console.log("after adding",json)
  }
  // Delete a note
  const deleteNote = async (id) => {
    // Calling Api 
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ZWQ2ZGVmMTk2OTU3ZmU4YzRkNzBmIn0sImlhdCI6MTcwMzA5MzYzNn0.frGaCDPtDkIb22lXGIMMuaM06HojPR0PvMMvCCS1hB8"
      },
    });
    const json = response.json();
    console.log(json)
  
    //logic
    
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)

  }
  // Edit a note
  const editNote = async (id, title, tag, description) => {
    // Calling Api 
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ZWQ2ZGVmMTk2OTU3ZmU4YzRkNzBmIn0sImlhdCI6MTcwMzA5MzYzNn0.frGaCDPtDkIb22lXGIMMuaM06HojPR0PvMMvCCS1hB8"
      },
      body: JSON.stringify({title, tag, description}),
    });

    // logic for editing
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.tag = tag;
        element.description = description;
      }

    }

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;