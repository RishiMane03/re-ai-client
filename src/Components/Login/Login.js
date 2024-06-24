import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../Login/backgroundVideo2.mp4'

function Login() {
  axios.defaults.withCredentials = true;

  const [loginId,setLoginId] = useState('')
  const [password,setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const fetchApi = async (e)=>{
    e.preventDefault()

    try {
        const res = await axios.post('http://localhost:8080/auth/login', { loginId, password })
        console.log(res.data)
    } catch (error) {
        console.log(error);
    }
    
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='Register'>
      <video autoPlay loop muted>
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
      </video>

      <div className='allRegister' style={{height: "40%"}}>
        <div className='headingRegister'>
          <h1>Login</h1>
        </div>

        <div className='formDiv'>
          <div className='formRegister'>
            <input type='text' placeholder='Username or Email' onChange={(e)=>setLoginId(e.target.value)}/>

            <div className='passwordVisibility'>
                <input type={showPassword ? "text" : "password"} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={togglePasswordVisibility}>
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>

          </div>

          <div className='submitRegister'>
            <p>Don't have account? <a
            onClick={()=>navigate('/register')} 
            style={{color: "cornflowerblue", cursor: "pointer"}}
            >
              Register
              </a>
            </p>
            <button onClick={fetchApi}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login