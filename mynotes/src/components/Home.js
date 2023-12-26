import React from 'react';
import Notes from './Notes';

export default function Home() {
  return (
    <div className="Container my-3">
      <h1>Add ur Notes Here</h1>
      {/* Note in take form for adding notes */}
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          <h5>Title</h5>
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="XYZ"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          <h5>Discreption</h5>
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
          defaultValue={""}
        />      
        <div className="col-12 my-3">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </div>
      <Notes/>
    </div >

  )
}
