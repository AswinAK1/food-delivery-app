import React, { useContext, useState } from 'react'
import '../LoginPopup/LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { storeContext } from '../../context/StoreContext'
import axios from 'axios'


const LoginPopup = ({setShowLogin}) => {

  const {url,setToken,} = useContext(storeContext)

  const [currentState,setCurrentState] = useState("Sign Up")
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name
    const value = event.target.value
    setData(data=>({...data,[name]:value}))
  }

  const onLogin = async(event) =>{
    event.preventDefault();
    let newUrl = url
    
    if(currentState==='Login'){
      newUrl += '/api/user/login'
    }
    else{
      newUrl += '/api/user/register'
    }

    const response = await axios.post(newUrl,data)
    if(response.data.success){
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }



  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currentState==="Sign Up"? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' />:""}

          <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Your Email' />
          <input name='password' value={data.password} onChange={onChangeHandler} type="password" placeholder='Your Password'/>
        </div>
        <button type='submit'>{currentState==='Sign Up'?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, i agree to the term of use & privacy policy.</p>
        </div>
        {currentState==='Login'
          ?<p>Create a new account ? <span onClick={()=>setCurrentState('Sign Up')}>Click here</span></p>
          :<p>Already have an account ? <span onClick={()=>setCurrentState('Login')}>Click here</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default LoginPopup