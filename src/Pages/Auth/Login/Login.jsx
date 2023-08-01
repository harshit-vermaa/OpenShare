import React, { useState } from 'react'
import Style from "./Login.module.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, NavLink } from "react-router-dom"
import { lightBlue } from '@mui/material/colors';


const Login = () => {

const PORT = process.env.PORT

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  console.log(user)

  const Submit = async (e) => {
    e.preventDefault()

    const { email, password } = user;

    try {
      const res = await fetch(`${PORT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        window.alert("Login Successfully")
        navigate('/profile')
      } else {
        console.log("error : ", res)
        window.alert("Invalid credentials")
      }
    } catch (error) {
      console.log("res hi nahi pahucha : ", error)
    }

  }

  return (
    <>
      <div className={Style.login}>
        <div className={Style.left}>
          <form method='POST' className={Style.box}>
            <div className={Style.boxHeading}>
              <NavLink to='/' ><h2>OpenShare</h2></NavLink>
              <h1>Welcome back !!</h1>
            </div>
            <div className={Style.box_inputs}>
              <TextField name='email' onChange={(e) => { handleInput(e) }} className={Style.input} id="standard-basic" label="Enter you email" variant="standard" />
              <TextField name='password' onChange={(e) => { handleInput(e) }} className={Style.input} id="standard-basic" label="Enter Password" variant="standard" />
            </div>
            <Button type='submit' onClick={Submit} variant="outlined">Login</Button>
          </form>
          <label htmlFor="">Don't have an account ? <NavLink to='/registration'><span style={{ textDecoration: "underline" }} >Sign in</span> </NavLink></label>
        </div>
        <div className={Style.right}>
          <NavLink to='/' ><h2>OpenShare</h2></NavLink>
          <h1>Unlock Your Mind, <br /> Share Your Ideas</h1>
        </div>
      </div>
    </>
  )
}

export default Login