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

    setNotes(json)

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
      body: JSON.stringify({ title, tag, description }),
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
    const json = await response.json();
    console.log(json)

    //logic

    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)

  }
  // Edit a note
  const editNote = async (id, title, tag, description) => {
    // Calling Api 
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3ZWQ2ZGVmMTk2OTU3ZmU4YzRkNzBmIn0sImlhdCI6MTcwMzA5MzYzNn0.frGaCDPtDkIb22lXGIMMuaM06HojPR0PvMMvCCS1hB8"
      },
      body: JSON.stringify({ title, tag, description }),
    });

    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // logic for editing
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].tag = tag;
        newNotes[index].description = description;
        break;
      }
    }
    setNotes(newNotes)
  }

  // Make a copy of an existing note
const copyNote = (id) => {
  const selectedNote = notes.find((note) => note._id === id);

  if (selectedNote) {
    const copiedNote = {
      title: `Copy of ${selectedNote.title}`,
      tag: selectedNote.tag,
      description: selectedNote.description,
    };

    // Call the addNote function to add the copied note
    addNote(copiedNote.title, copiedNote.tag, copiedNote.description);
  }
};



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, copyNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;