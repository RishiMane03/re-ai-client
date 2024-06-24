import './App.css';
import { Routes, Route } from 'react-router-dom';

// Components
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import LandingPage from './Components/LandingPage/LandingPage';
import Dashboard from './Components/Dashboard/Dashboard';
import Summary from './Components/Summary/Summary';
import Code from './Components/Code/Code';
import Bot from './Components/Bot/Bot';
import ImageIdentify from './Components/ImageIdentify/ImageIdentify';

function App() {
  return (
    <div>
       <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/summaryHub" element={<Summary />} />
        <Route path="/codeHub" element={<Code/>} />
        <Route path="/chatHub" element={<Bot/>} />
        <Route path="/imageHub" element={<ImageIdentify/>} />
      </Routes>
    </div>
  );
}

export default App;
