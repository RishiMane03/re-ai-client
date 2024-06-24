import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './Register.css'
import { useNavigate } from 'react-router-dom';
import backgroundVideo from '../Register/backgroundVideo2.mp4'

function Register() {

    axios.defaults.withCredentials = true;

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()

    const validateEmail = (email)=>{
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    function validatePassword(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const fetchApi = async (e)=>{
        e.preventDefault()

        try {
            const res = await axios.post('http://localhost:8080/auth/register', { name,email,username,password })

            if(!name || !email || !username || !password)
                return alert('Please enter all data')

            if(!validateEmail(email)) return alert("Email is not valid")

            if(!validatePassword(password)){
                return alert("Password should have a-z, A-Z, 0-9, length >= 8 and special character")
            }

            console.log(res.data.message) 
            return alert(res.data.message) 
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

        <div className='allRegister'>
            <div className='headingRegister'>
                <h1>REGISTER</h1>
            </div>

            <div className='formDiv'>
                <div className='formRegister'>
                    <input type='text' placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
                    <input type='text' placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                    <input type='text' placeholder='Username' onChange={(e)=>setUsername(e.target.value)}/>
                    <div className='passwordVisibility'>
                        <input type={showPassword ? "text" : "password"} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                        <button onClick={togglePasswordVisibility}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <div className='submitRegister'>
                    <p>Already have account? <a
                        onClick={()=>navigate('/login')} 
                        style={{color: "cornflowerblue", cursor: "pointer"}}
                        >
                        Login
                        </a>
                    </p>
                    <button onClick={fetchApi}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register