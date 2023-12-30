import React, {useContext} from 'react';
import noteContext from '../Context/notes/noteContext';



const NoteItems = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote, copyNote  } = context;
    return (
        <div className='col-md-3' style={{ margin: "20px" }}> 
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted" >{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <div>
                    <i  style={{ margin: "10px" }} className="fa-solid fa-trash-can mx-2" onClick={()=> {deleteNote(note._id)}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=> {updateNote(note)}} ></i>
                    <button className="btn btn-secondary mx-1" onClick={() => copyNote(note._id)}>Copy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItems