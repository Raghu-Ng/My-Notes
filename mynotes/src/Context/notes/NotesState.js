import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [setCopiedNote] = useState(null);
  // const [copiedNote, setCopiedNote] = useState(null);

  // const [notes, setNotes] = useEffect(notesInitial)
  const [notes, setNotes] = useState(notesInitial);

  // get all note
  const getNotes = async () => {
    // Calling Api 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
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
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, tag, description }),
    });
    const note = await response.json();
    setNotes(notes.concat(note))

    //at first for checking
    // const note = {
    //   "_id": "658a1d4979f2796e024e25c4",
    //   "user": "657ed6def196957fe8c4d70f",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2023-12-26T00:24:41.339Z",
    //   "__v": 0
    // };

  }
  // Delete a note
  const deleteNote = async (id) => {
    // Calling Api 
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
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
        "auth-token": localStorage.getItem('token')
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

 // Adding a function to copy the note to clipboard
const copyNoteToClipboard = async (id) => {
  const selectedNote = notes.find((note) => note._id === id);

  if (selectedNote) {
    const copiedText = `Title: ${selectedNote.title},\nTag: ${selectedNote.tag},\nDescription: ${selectedNote.description}`;

    try {
      await navigator.clipboard.writeText(copiedText);
      console.log('Note copied to clipboard:', copiedText);
      setCopiedNote(selectedNote); // Updating the state to indicate the copied note

      // Reset the copied note state after 5 seconds
      setTimeout(() => {
        resetCopiedNote();
      }, 5000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  }
};
// Adding a function to reset the copied note state
const resetCopiedNote = () => {
  setCopiedNote(null);
};


const shareViaEmail = (note) => {
  const { title, tag, description } = note;
  const subject = encodeURIComponent(`Note: ${title}`);
  const body = encodeURIComponent(`Tag: ${tag}\nDescription: ${description}`);
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;

  // Open Gmail online compose page
  window.open(mailtoLink, '_blank');
};


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, copyNote, copyNoteToClipboard, setCopiedNote, shareViaEmail }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;