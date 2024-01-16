import React, {useState} from 'react';
import {MDBBtn,MDBContainer,MDBRow,MDBCol,MDBCard,MDBCardBody,MDBInput} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import "./signup.css"

function Signup(props) {

  const {showalert} = props;
  const [credentials, setcredentials] = useState({firstName:"", lastName:"", email: "", password: "" , cpassword:""});
  const Navigate = useNavigate();


const handleGoogleLoginSuccess = async (credentialResponse) => {
  // Decode the JWT token to get user information
  console.log( "handleGoogleLoginSuccess started" )
  const decodedToken = jwtDecode(credentialResponse.credential);
  console.log('Decoded Google Login Token:', decodedToken);

  // Check if the decoded token contains the necessary information
  // if (decodedToken && decodedToken.payload) {
    const { credentials } = credentialResponse;
    const { email, family_name, given_name, sub } = decodedToken.payload;


    await setcredentials({
      ...credentials,
      email,
      firstName: given_name,
      lastName: family_name,
      password: sub,
      cpassword: sub,
    }, () => {
      // Logic to execute after setting credentials
      handleSubmit();
    });
  // } else {
  //   console.error('Decoded Google login token is missing expected properties');
  // }
};

  



  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    // api call
    const {firstName,lastName,email,password, cpassword} = credentials;
    
        // Check if passwords match
        if (password !== cpassword) {
          showalert("Passwords do not match", "danger");
          return;
        }
        
    const response = await fetch(`http://localhost:5000/api/authen/createuser/`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName,lastName,email,password }),
    });
    const json = await response.json()
    console.log(json.succes)
    if (json.succes){
      localStorage.setItem('token', json.authtoken)
      Navigate("/");
      showalert("Account created successfully","success")
    } 
    else{
      showalert("Check Details again","danger")
    }
  }

  const onChange=(e)=>{
    setcredentials ({...credentials, [e.target.name]: e.target.value})
}






  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

    <MDBRow>

      <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
        Note It Down: <br />
          <span style={{color: 'hsl(218, 81%, 75%)'}}>Your Thoughts, Your Way.</span>
        </h1>

        <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Eveniet, itaque accusantium odio, soluta, corrupti aliquam
          quibusdam tempora at cupiditate quis eum maiores libero
          veritatis? Dicta facilis sint aliquid ipsum atque?
        </p>

      </MDBCol>

      <MDBCol md='6' className='position-relative'>

        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <MDBCard className='my-5 bg-glass'>
          <MDBCardBody className='p-5'>

            <MDBRow>
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='First name' name='firstName' id='firstName' onChange={onChange} type='text'/>
              </MDBCol>

              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='Last name' name='lastName' id='lastName' onChange={onChange} type='text'/>
              </MDBCol>
            </MDBRow>

            <MDBInput wrapperClass='mb-4' label='Email' name='email' id='email' onChange={onChange} type='email'/>
            <MDBInput wrapperClass='mb-4' label='Password' name='password' id='password' onChange={onChange} type='password' minLength={8} required/>
            <MDBInput wrapperClass='mb-4' label='Confirm Password'  name='cpassword' id='cpassword' onChange={onChange} type='password' minLength={8} required/>


            <MDBBtn className='w-100 mb-4'  type='submit' onClick={handleSubmit} size='md'>sign up</MDBBtn>

            <div className="text-center">

              <p>or sign up with:</p>

              <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(decoded);

                  handleGoogleLoginSuccess()
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
                // onClick={handleGoogleLoginSuccess}
                />;
              </MDBBtn>

            </div>

          </MDBCardBody>
        </MDBCard>

      </MDBCol>

    </MDBRow>

  </MDBContainer>
);
}

export default Signup