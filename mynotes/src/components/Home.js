import React from 'react';
import Notes from './Notes';

export default function Home(props) {
  const {showalert} = props
  return (
    <div className="Container my-3">
      <Notes showalert={showalert}/>
    </div >

  )
}
