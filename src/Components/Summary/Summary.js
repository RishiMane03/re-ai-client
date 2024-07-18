import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './Summary.css'
import NavBar from '../NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';
// import VariableContext from '../../Content/VariableContext';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

async function geminiAi(text, content) {
  const prompt = `${text} ${content}`;
  console.log('prompt: ', prompt);

  try {
    const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textData = await response.text();
    console.log(textData);
    return textData;
  } catch (error) {
    console.error('Error generating content:', error);
    return 'API is not Working';
  }
}

function Summary() {

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  
  const [paragraph, setParagraph] = useState('');
  const [summary, setSummary] = useState('');
  const [typingContent, setTypingContent] = useState('');
  const [loaderDisplay, setLoaderDisplay] = useState(false)
//   const { userInfo } = useContext(VariableContext);
//   const BackendURL = process.env.REACT_APP_BACKEND_URL
  // console.log(BackendURL);
  
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;


  const handleSummarize = async () => {
    setTypingContent('')
    setSummary('')
    if(paragraph === '' || paragraph === null){
      toast.error(`Please add the paragraph`)
      return
    }

    if(paragraph.length < 100){
      toast.error(`Please add at least 100 characters`)
      return
    }

    try {
      setLoaderDisplay(true)
      // const response = await axios.post(`https://re-ai-server-2.onrender.com/ai/summarize`, { paragraph });
      // setSummary(response.data.summary);
      const summaryText = await geminiAi('Summarize this:', paragraph);
      setSummary(summaryText);
    } catch (error) {
        console.log(error);
    }
  };
//   console.log(summary);

  useEffect(() => {
    if (summary) {
      const typingEffectInterval = setInterval(() => {
        if (summary.length > typingContent.length) {
          setTypingContent((prevContent) => summary.slice(0, prevContent.length + 1));
        } else {
          clearInterval(typingEffectInterval);
        }
      }, 35); // Adjust typing speed as needed
      return () => clearInterval(typingEffectInterval);
    }
  }, [summary, typingContent]);

  return (
    <div className="Summary">
      <NavBar />
      <div className='inputSummary'>
        <div className='aiHeading'>
            <h1>Summary</h1>
            <p>Revolutionize your writing with our summary tool! Paste, click, and watch your text transform faster than a rabbit in a magic hat. Say goodbye to long-winded essays and hello to punchy summaries!</p>
        </div>
        <textarea
          className="textarea"
          placeholder="Place your paragraph..."
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
        ></textarea>
        <button onClick={handleSummarize} className="aiBtn"><span>Get Summary</span></button>

        <div className="content">
          {summary && loaderDisplay ? (
              <span>{typingContent}</span>
          ) : (
            <div className={loaderDisplay ? 'spinner' : 'block'}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>

      </div>

      
      
    </div>
  );
}

export default Summary;
