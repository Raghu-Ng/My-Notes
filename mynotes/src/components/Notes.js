import React, { useContext, useEffect, useRef } from 'react';
import noteContext from '../Context/notes/noteContext';
import NoteItems from './NoteItems';
import AddNotes from './AddNotes';




export default function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
  }, []);
 
  const updateNote = (note) => {
    ref.current.click();
    console.log("working updateNote ")
  }

  const ref = useRef(null)
  return (
    <>
      <AddNotes />
      {/* edit modal */}
      <button ref={ref} type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"  aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>


      {/* existing notes will be shown here */}
      <div className="row my-3">
        <h1>My Notes</h1>
        {notes.map((note) => {
          return <NoteItems key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

