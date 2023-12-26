import React, { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';
import NoteItems from './NoteItems';


export default function Notes() {
    const context = useContext(noteContext);
    const {notes, setNotes} = context;
  return (
    <>      
        {/* existing notes will be shown here */}
    <div className="row my-3">
      <h1>My Notes</h1>
      {notes.map((note)=>{
        return <NoteItems note = {note}/>
      })}
    </div>
    </>
  )
}
