import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './Bot.css'
import { useNavigate } from 'react-router-dom';

// MUI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SummaryIcon from '@mui/icons-material/Assignment';
import CodeIcon from '@mui/icons-material/Code';
import ChatIcon from '@mui/icons-material/Chat';
import ImageIcon from '@mui/icons-material/Image';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

function Bot() {

  // MUI
  const [open, setOpen] = React.useState(false);

  //bot
  const [messages, setMessages] = useState([
    { role: 'user', text: 'Hello, how are you?' },
    { role: 'model', text: 'As an AI, I dont have feelings or emotions like humans do. But I am here and ready to assist you.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMessage = { role: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');
    setLoading(true);

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chat = model.startChat({
      history: messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(input);
    const response = await result.response;
    const text = await response.text();

    setMessages([...messages, newMessage, { role: 'model', text }]);
    setLoading(false);
  };
  
  // MUI
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleDrawerItemClick = (text) => {
    switch (text) {
      case 'Summary':
        navigate('/summaryHub');
        break;
      case 'Code':
        navigate('/codeHub');
        break;
      case 'Chat':
        navigate('/chatHub');
        break;
      case 'PDF':
        navigate('/pdfHub');
        break;
      case 'Image':
        navigate('/imageHub');
        break;
      default:
        break;
    }
  };

  // MUI
  const icons = [<SummaryIcon />, <CodeIcon />, <ChatIcon />, <ImageIcon />];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Summary', 'Code', 'Chat', 'Image'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleDrawerItemClick(text)}>
              <ListItemIcon>
                {icons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className='botDiv' style={{display: "flex", alignItems: "start"}}>
        <div className='drawerCls'>
            <Button onClick={toggleDrawer(true)}><MenuIcon style={{fontSize: '2.5rem', marginBottom: '1rem'}}/></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>

        <div className="ChatBot"  style={{display: "flex",flex: "20"}}>
            <div className="chat-window">
                {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                    <span className="chat-name">{msg.role === 'user' ? 'You' : 'AI'}</span>
                    <span>{msg.text}</span>
                </div>
                ))}
                {loading && (
                <div className="chat-message model">
                    <span className="chat-name">AI</span>
                    <span className="loader"></span>
                </div>
                )}
            </div>
            
            <form onSubmit={handleSubmit} className='chatForm'>
                <input
                    className='chattingInput'
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    disabled={loading}
                />
                <button className='chattingBnt' type="submit" disabled={loading}>Send</button>
            </form>
        </div>
    </div>
    
  )
}

export default Bot