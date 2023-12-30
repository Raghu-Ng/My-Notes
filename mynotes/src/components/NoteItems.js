import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../Context/notes/noteContext';



const NoteItems = (props) => {
    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote, copyNote, copyNoteToClipboard, copiedNote, shareViaEmail } = context;
    const [showFirstIcon] = useState(true)
    // const [showFirstIcon, setShowFirstIcon] = useState(true)
    // Define showFirstIcon state
    const [localShowFirstIcon, setLocalShowFirstIcon] = useState(showFirstIcon);

    useEffect(() => {
        // Update localShowFirstIcon when showFirstIcon changes
        setLocalShowFirstIcon(showFirstIcon);
    }, [showFirstIcon]);

    return (
        <div className='col-md-3' style={{ margin: "20px" }}>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted" >{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                    <div>
                        {/* buttons */}
                        <i style={{ margin: "10px" }} className="fa-solid fa-trash-can mx-2" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }} ></i>
                        <i className="fa-solid fa-copy mx-2" onClick={() => copyNote(note._id)}></i>

                        {/* the toggling copy to clipboard button (3 hrs)*/}
                        {/* <i className="fa-solid fa-clipboard mx-2"onClick={() => copyNoteToClipboard(note._id)}></i> */}
                        {/* {copiedNote && copiedNote._id === note._id && (<span className='text-success'><i className="fa-solid fa-circle-check"></i></span>)} */}
                        {localShowFirstIcon ? (
                            <i className="fa-solid fa-clipboard mx-2" onClick={() => {
                                copyNoteToClipboard(note._id);
                                // Toggle the showFirstIcon state after copying to clipboard
                                setLocalShowFirstIcon(false);

                                // Reset the showFirstIcon state after 5 seconds
                                setTimeout(() => {
                                    setLocalShowFirstIcon(true);
                                }, 3000);
                            }}></i>
                        ) : (<span className='text-success'><i className="fa-solid fa-circle-check mx-2"></i></span>
                        )}
                        {copiedNote && copiedNote._id === note._id && (
                            <span className='text-success'><i className="fa-solid fa-circle-check mx-2"></i></span>
                        )}
                            {/* share via gmail */}
                        <i className="fa-solid fa-envelope mx-2" onClick={() => shareViaEmail(note)}></i>
                        {/* <button onClick={() => shareViaEmail(note)}>Share via Email</button> */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItems


