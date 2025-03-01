import React, { useState } from 'react';
import './App.css';
import VideoDivFunc from './Video_Hosting_Div/video_div';
import GridExample from './Transcription_Div/transcription_div';
import QuestionBoxDiv from './Q&A_Div/q_and_a_div.js';

function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [videoStopped, setVideoStopped] = useState(false);

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
  };

  // ✅ Modern and warm contrast styling
  const boxStyle = {
    borderRadius: "12px", // Rounded edges for smooth look
    backgroundColor: "#ffffff", // Crisp white background
    padding: "12px",
    border: "1px solid #d1d5db", // Muted grayish-blue border for subtle contrast
    boxShadow: "3px 3px 12px rgba(0, 0, 0, 0.05)", // Soft depth effect
  };

  return (
    <div style={{ padding: "5px 12px 5px 12px", backgroundColor: "#f4f4f4" }}> {/* Light neutral background */}
      <div style={{ display: "flex", gap: "12px" }}>
        <div style={{ ...boxStyle, flex: "40%", height: "57vh" }}>
          <GridExample currentTime={currentTime} />
        </div>
        <div style={{ ...boxStyle, flex: "60%", height: "57vh" }}>
          <VideoDivFunc onTimeUpdate={handleTimeUpdate} videoStopped={videoStopped} setVideoStopped={setVideoStopped} />
        </div>
      </div>
      <div style={{ ...boxStyle, height: "33vh", marginTop: "12px" }}>
        <QuestionBoxDiv currentTime={currentTime} videoStopped={videoStopped} setVideoStopped={setVideoStopped} />
      </div>
    </div>
  );
}

export default App;

