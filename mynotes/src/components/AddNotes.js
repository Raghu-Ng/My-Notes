import React, { useContext, useState } from 'react';
import noteContext from '../Context/notes/noteContext';

export default function AddNotes(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const  [note, setNote] = useState({title:"", tag: "", description:""})

    const handelClick= (e)=>{
        e.preventDefault()
        addNote(note.title, note.tag, note.description);
        // emptying the boxs
        setNote({ title: "", tag: "", description: "" });
        props.showalert("Your Note was added successfully" , "warning")
    }

    const onChange=(e)=>{
        setNote ({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>   
    <h1 style={{color: "white"}}>Add ur Notes Here</h1>
    {/* Note in take form for adding notes */}
    <div className="mb-3">
      <label htmlFor="title" className="form-label">
        <h5 style={{color: "white"}}>Title</h5>
      </label>
      <input
        type="text"
        className="form-control"
        id="title"
        name="title"
        placeholder="XYZ"
        onChange={onChange}
        value={note.title}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="tag" className="form-label">
        <h5 style={{color: "white"}}>tag</h5>
      </label>
      <input
        type="text"
        className="form-control"
        id="tag"
        name="tag"
        placeholder="Tags"
        onChange={onChange}
        value={note.tag}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">
        <h5 style={{color: "white"}}>description</h5>
      </label>
      <textarea
        className="form-control"
        id="description"
        name="description"
        rows={3}
        defaultValue={""}
        onChange={onChange}
        value={note.description}
      />      
      <div className="col-12 my-3">
        <button disabled={note.title.length<5 || note.description.length<8} className="btn btn-primary" onClick={handelClick} type="submit">
          <i className="fa-solid fa-square-plus m-2"></i>
          Add Note
        </button>
      </div>
    </div>
    </div>
  )
}
