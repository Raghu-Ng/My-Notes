import React, { useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCol,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
from 'mdb-react-ui-kit';
import "./login.css"
function Login() {
  const [credentials, setcredentials] = useState({email: "", password: ""})

  const handleSubmit= async (e)=>{
    e.preventDefault();
    // api call
    const response = await fetch(`http://localhost:5000/api/authen/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json()
    console.log(json)
  }
  const onChange=(e)=>{
    setcredentials ({...credentials, [e.target.name]: e.target.value})
}

  return (
    <MDBContainer fluid>
      <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{height: '200px', borderRadius: '10px'}}>
      <MDBCol md='6' className='position-relative'>
      <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
        <div id="radius-shape-3" className="position-absolute shadow-5-strong"></div>
        </MDBCol>
      {/* <div className="p-5 bg-image"  style={{height: '200px', borderRadius: '10px'}}> style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px', borderRadius: '10px'}}></div> */}
      </MDBContainer>
      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.3)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center'>

          <h2 className="fw-bold mb-5">Sign up now</h2>

          <MDBInput wrapperClass='mb-4' label='Email' id='email'  value={credentials.email} onChange={onchange} name='email' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' id='password'  value={credentials.password} onChange={onchange} name='password' type='password'/>


          <MDBBtn className='w-100 mb-4' type='submit' onSubmit={handleSubmit} size='md'>Login</MDBBtn>

          <div className="text-center">


            <p>or sign in with:</p>

            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
              <MDBIcon fab icon='google' size="sm"/>
            </MDBBtn>

          </div>

        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login