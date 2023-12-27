import React, { useContext, useEffect } from 'react';
import noteContext from '../Context/notes/noteContext';
import NoteItems from './NoteItems';
import AddNotes from './AddNotes';
import getNotes from './AddNotes';

export default function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []); 

    return (
    <>
      <AddNotes />
      {/* existing notes will be shown here */}
      <div className="row my-3">
        <h1>My Notes</h1>
        {notes.map((note) => {
          return <NoteItems key={note._id} note={note} />
        })}
      </div>
    </>
  )
}
