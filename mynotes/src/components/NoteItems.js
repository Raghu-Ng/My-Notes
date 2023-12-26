import React from 'react';

const NoteItems = (props) => {
    const { note } = props;
    return (
        <div className='col-md-3' style={{ margin: "20px" }}> 
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>

        </div>
    )
}

export default NoteItems