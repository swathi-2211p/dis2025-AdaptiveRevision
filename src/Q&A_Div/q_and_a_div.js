import React, { useEffect, useRef } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  FormLabel,
  Button,
  Box,
  Typography,
} from "@mui/material";
import {question_and_answer_array} from './q_and_a_generator.js';

export default function QuestionBoxDiv({ currentTime, videoStopped, setVideoStopped }) {
  const optionsExample = [
      { label: "Many species are moving north as the climate warms, to find cooler temperatures.", value: "berlin" },
      { label: "Some species are struggling to adapt to the changing weather patterns and are facing extinction.", value: "madrid" },
      { label: "Climate change is causing a shift in the distribution of species, leading to more competition for resources.", value: "wrong" }, // Correct answer
      { label: "All of the above.", value: "correct" },
    ];
  const [transcription, setTranscription] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [options, setOptions] = React.useState(optionsExample);
  const [question, setQuestion] = React.useState("What are some of the ways that climate change is affecting wildlife?");
  const [helperText, setHelperText] = React.useState("Select an option");
  const stopTimeList = [600, 1200, 1800, 2400, 2800]

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  useEffect(() => {
    if(videoStopped){
        const stoppedTime = Math.round(currentTime/100) * 100;
        console.log(stoppedTime);
        const indexOfQandA = stopTimeList.indexOf(stoppedTime);
        const MCQ = question_and_answer_array[indexOfQandA];
        setQuestion(MCQ.question);
        setOptions(MCQ.options);
    }
    setVisible(videoStopped);
    if(!videoStopped){
            setError(false);
            setHelperText("");
            setValue("");
    }
  },[videoStopped]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "correct") {
      setHelperText("✅ Correct answer!");
      setTimeout(() => {
             setVideoStopped(false);;
      }, 1000); // 20 seconds delay
//      setError(false);
//      setHelperText("");
//      setValue(event.target.value);
    } else if (value) {
      setHelperText("❌ Wrong answer! Try again.");
      setError(true);
    } else {
      setHelperText("⚠️ Please select an option.");
      setError(true);
    }
  };

  if (!visible) return null; // Hide component if visible is false

return (
  <form onSubmit={handleSubmit} key={options} style={{ maxHeight: '33vh', overflow: 'auto' }}>
    <FormControl error={error} fullWidth>
      <FormLabel id="quiz-question">
        <Typography variant="h7">
          {question}
        </Typography>
      </FormLabel>
      <RadioGroup
        aria-labelledby="quiz-question"
        name="quiz"
        value={value}
        onChange={handleRadioChange}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          type="submit"
          size="small" // Makes the button smaller
          sx={{ fontSize: "0.75rem", padding: "4px 10px", minWidth: "auto" }} // Further reduces size
        >
          Submit Answer
        </Button>
      </Box>
    </FormControl>
  </form>
);
}
