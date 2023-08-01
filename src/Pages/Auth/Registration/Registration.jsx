import React, { useState } from 'react'
import Style from "./Registration.module.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, NavLink } from 'react-router-dom';

const Registration = () => {
  const PORT = process.env.PORT
  const navigation = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    bio: '',
  })
  const [file, setFile] = useState()

  const handleInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleFile = (e) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password, cpassword, bio } = user;
      const formData = new FormData;
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('cpassword', cpassword)
      formData.append('bio', bio)
      formData.append('image', file)
console.log(formData)
      const res = await fetch(`https://openshare-server.onrender.com/registration`, {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
        body: formData,
      });
      if (res.ok) {
        console.log('successful registration', res);
        window.alert('Registration successful');
        navigation('/login')
      } else {
        console.log('failed', res);
        window.alert('Registration failed');

      }
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <>
      <div className={Style.registration}>
        <div className={Style.left}>
          <NavLink to='/' ><h2>OpenShare</h2></NavLink>
          <h1>Explore, Discover, <br /> Learn & Share</h1>
        </div>
        <div className={Style.right}>
          <form method='POST' className={Style.box}>
          <div className={Style.boxHeading}>
              <NavLink to='/' ><h2>OpenShare</h2></NavLink>
              <h1>Join Now !!</h1>
          </div>
            <div className={Style.box_inputs}>
              <TextField name='name' onChange={(e) => { handleInput(e) }} className={Style.input} id="standard-basic" label="Enter your name" variant="standard" />
              <TextField name='email' onChange={(e) => { handleInput(e) }} className={Style.input} id="standard-basic" label="Enter your email" variant="standard" />
              <TextField name='image' onChange={handleFile} className={Style.input} type='file' id="standard-basic" label="Profile Image" variant="standard" />
              <TextField name='bio' onChange={(e) => { handleInput(e) }} className={Style.input} id="standard-basic" label="Enter your bio" variant="standard" />
              <TextField name='password' onChange={(e) => { handleInput(e) }} className={Style.input} id="standard-basic" label="Enter Password" variant="standard" />
              <TextField name='cpassword' onChange={(e) => { handleInput(e) }} className={Style.input} id="standard-basic" label="Confirm Password" variant="standard" />
            </div>
            <Button type='submit' onClick={Submit} variant="outlined">Sign in</Button>
          </form>
          <label htmlFor="">Already have an account ? <NavLink to='/login'><span style={{ textDecoration: "underline" }} >Log in</span> </NavLink></label>
        </div>
       
      </div>
    </>
  )
}


export default Registration