import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './ImageIdentify.css';
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
import PdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';


function ImageIdentify() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [inputPrompt, setInputPrompt] = useState("");
  const [loading, setLoading] = useState(false);

   // MUI
   const [open, setOpen] = React.useState(false);

   const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/jpeg" && file.size < 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImagePreview(URL.createObjectURL(file));
      };
      reader.readAsDataURL(file);
      setMessage('');
    } else {
      setMessage("Please upload a JPG image less than 1MB.");
      setImagePreview(null);
    }

    // Clear the input value to allow re-uploading the same file
    event.target.value = '';
  };

  const callMe = async (base64Image) => {
    setLoading(true); // Start loading
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const imagePayload = {
      inlineData: {
        data: base64Image.split(',')[1], // Remove data:image/jpeg;base64, part
        mimeType: "image/jpeg",
      },
    };

    try {
      let prompt = inputPrompt
      const result = await model.generateContent([prompt, imagePayload]);
      setMessage(result.response.text());
    } catch (error) {
      console.error(error);
      setMessage("Error processing the image.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (image) {
      callMe(image);
    } else {
      setMessage("Please upload a valid image.");
    }
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
    <div className="imageIdentify" style={{display: "flex", alignItems: "start"}}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "95vw"}}>
            <Button onClick={toggleDrawer(true)}><MenuIcon style={{fontSize: '2.5rem', marginBottom: '1rem'}}/></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        <h2>Image Buddy</h2>
      </div>
      
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <div
            className="fileUploadWrapper"
            onClick={() => document.getElementById('fileUpload').click()}
          >
            <input
              id="fileUpload"
              className="fileUpload"
              type="file"
              accept="image/jpeg"
              onChange={handleImageUpload}
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Uploaded preview" />
            ) : (
              <span>Click here to upload a JPG image (less than 1MB)</span>
            )}
          </div>
          <input
            className="promptInput"
            type="text"
            placeholder="Enter Prompt"
            onChange={(e) => setInputPrompt(e.target.value)}
          />
          <button className='imgIdBtn' type="submit">Submit</button>
        </form> 
        {loading && <p className='pTag'>Loading...</p>}
        {message && <p className='pTag'>{message}</p>}
      </div>
    </div>
  );
}

export default ImageIdentify;
