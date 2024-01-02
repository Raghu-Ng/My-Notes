import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/notes/noteContext';
import NoteItems from './NoteItems';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';


export default function Notes(props) {

  const context = useContext(noteContext);
  const navigate = useNavigate()
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
        console.log("token")
    }
    else{
        navigate('/login')
        props.showalert('login to your account to get your notes','info')
    }
    // eslint-disable-next-line
}, [])

  useEffect(() => {
    getNotes();// eslint-disable-next-line
  }, []);

  const ref = useRef(null)
  const refClose = useRef(null)
  const  [note, setNote] = useState({id: "",  title:"", tag: "", description:""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description});
    // console.log("working updateNote ")
  }

  const handelClick= (e)=>{
    editNote(note.id, note.etitle, note.etag, note.edescription)
    refClose.current.click();
    props.showalert("Notes updated successfully" , "warning")
    // console.log("updating....",note) 
}

const onChange=(e)=>{
    setNote ({...note, [e.target.name]: e.target.value})


}
  return (
    <>
      <AddNotes showalert={props.showalert}/>
      {/* edit modal */}
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="etitle" className="form-label">
                  <h5>Title</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  value={note.etitle}
                  placeholder="XYZ"
                  onChange={onChange}
                  minLength={5} required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">
                  <h5>tag</h5>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etag"
                  name="etag"
                  value={note.etag}
                  placeholder="Tags"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">
                  <h5>description</h5>
                </label>
                <textarea
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  value={note.edescription}
                  rows={3}
                  onChange={onChange}
                  minLength={8} required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button ref= {refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button onClick={handelClick} type="button" className="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>


      {/* existing notes will be shown here */}
      <div className="row my-3">
        <h1 style={{color: "white"}}>My Notes</h1>
        <h5 className='text-center' style={{color: "white"}}>{notes.length===0 && 'No notes yet, add now'}</h5>
        {notes.map((note) => {
          return <NoteItems showalert={props.showalert} key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

