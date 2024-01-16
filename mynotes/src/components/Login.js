import React, { useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCol,
  MDBCardBody,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import "./login.css"
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


function Login(props) {

  const { showalert } = props;
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
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
    console.log(json.succes)
    if (json.succes) {
      localStorage.setItem('token', json.authtoken)
      Navigate("/");
      showalert("login successfull", "success")
    }
    else {
      showalert("Invalid Details", "danger")
    }
  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <MDBContainer fluid>
      <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ height: '200px', borderRadius: '10px' }}>
        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
          <div id="radius-shape-3" className="position-absolute shadow-5-strong"></div>
        </MDBCol>
        {/* <div className="p-5 bg-image"  style={{height: '200px', borderRadius: '10px'}}> style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px', borderRadius: '10px'}}></div> */}
      </MDBContainer>
      <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
        <MDBCardBody className='p-5 text-center'>

          <h2 className="fw-bold mb-5">Login</h2>

          <MDBInput wrapperClass='mb-4' label='Email' id='email' name="email" value={credentials.email} onChange={onChange} type='email' />
          <MDBInput wrapperClass='mb-4' label='Password' id='password' value={credentials.password} onChange={onChange} name='password' type='password' />


          <MDBBtn className='w-100 mb-4' type='submit' onClick={handleSubmit} size='md'>Login</MDBBtn>

          <div className="text-center">


            <p>or sign in with:</p>

            <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />;

            </MDBBtn>

          </div>

        </MDBCardBody>

      </MDBCard>
      <h1>/n</h1>

    </MDBContainer>
  );
}


export default Login