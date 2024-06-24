import React, { useState,useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import flowerLogo2 from '../../assets/A-2.png'
import './Dashboard.css'
import axios from 'axios';
import toast from 'react-hot-toast';
// import VariableContext from '../../Content/VariableContext';

// MUI
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import LogoutIcon from '@mui/icons-material/Logout';


function Dashboard() {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  // MUI
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  axios.defaults.withCredentials = true;
  const [articles, setArticles] = useState([]);
  // const { userInfo } = useContext(VariableContext);
  const BackendURL = process.env.REACT_APP_BACKEND_URL
  const navigate = useNavigate();

  // light lamp
  const [isActive, setIsActive] = useState(false); // State for button
  const [isLightOn, setIsLightOn] = useState(false); // State for light
  const [isAllSloganOn, setIsAllSloganOn] = useState(false); // State for allSlogan

  const toggleBtn = () => {
    setIsActive(prev => !prev); // Toggle isActive state
    setIsLightOn(prev => !prev); // Toggle isLightOn state
    setIsAllSloganOn(prev => !prev); // Toggle IsAllSloganOn state
  };

  const logoutFun = async () => {
    try {
      const response = await axios.post(`https://ai-v3-back.onrender.com/logout`);
      console.log(response.data);
      if(response.data.logoutSucess){
        navigate('/login')
        return toast.success("Logout Successfull")
      }
    } catch (error) {
      console.error('Error:', error);
      if(error.response.data.sessionExpired){
        navigate('/login')
        return  toast.error("Session Exipred Please Login")
      }
    }
  }

  return (
    <div className='HomePage'>
      <div className="hero">
        <nav className='dashboardNavBar'>
          <div className='logoNtitle'>
            <img onClick={()=>navigate('/')} src={flowerLogo2} style={{ width: '65px', height: '50px' }} alt="" className="logo" />
            <h1>AiHub</h1>
          </div>
          <ul className='allLinks'>
            <NavLink to='/summaryHub'>Summary</NavLink>
            <NavLink to='/codeHub'>Code</NavLink>
            <NavLink to='/chatHub'>Chat</NavLink>
            <NavLink to='/imageHub'>Image</NavLink>
          </ul>

          <div className='menuBtnDiv'>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className = 'menuBtn'
            >
              Menu
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={()=>navigate('/summaryHub')}>Summary</MenuItem>
              <MenuItem onClick={()=>navigate('/codeHub')}>Code</MenuItem>
              <MenuItem onClick={()=>navigate('/chatHub')}>Chat</MenuItem>
              <MenuItem onClick={()=>navigate('/imageHub')}>Image</MenuItem>
            </Menu>
          </div>
        </nav>
        
        <section className='lampNtext'>
          <div className="lamp-container">
            <img src="https://i.postimg.cc/yYz5Nnqw/lamp.png" alt="" className="lamp" />
            <img src="https://i.postimg.cc/SxgtDhXh/light.png" alt="" className={isLightOn ? 'light on' : 'light'} />
          </div>

          <div className="text-container">
            <div className='switchDiv'>
              <h3 className='shineLightSlogan'>Shine a <span>LIGHT</span> of hope. Click here</h3>
              <label className="toggle-switch">
                <input type="checkbox" checked={isActive} onChange={toggleBtn} />
                <span className="slider"></span>
              </label>
            </div>

            <div className={isAllSloganOn ? 'SloganOn' : 'SloganOff'}>
              <h1 className='ctrlSlogan'>We Make Ctrl+C and Ctrl+V <br /> <span>Seem Like Magic!</span></h1>
              <p onClick={()=>navigate('/imageHub')}>Instant Art: No Brushes or Talent Required!</p>
              <p onClick={()=>navigate('/summaryHub')}>Summary Magic : Because Ain't Nobody Got Time for Full Paragraphs!</p>
              <p onClick={()=>navigate('/chatHub')}>Chatting with the AI: Because Therapy is Expensive!</p>
              <p onClick={()=>navigate('/codeHub')}>Coding Made as Easy as Pie (or as complicated as quantum physics)!</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard