import React, { useState, useEffect } from "react";
import axios from "axios";
import { getquestions, getanswers } from "../API/ApiRoutes";

const Evaluation = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [userName, setUserName] = useState("");
  useEffect(() => {
     const storedUserName = sessionStorage.getItem("name");
     const storedEmail = sessionStorage.getItem("email");
     if (!storedUserName || !storedEmail) {
       // If name or email is not present, navigate to login page
       navigate("/");
     } else {
       // Set the user name if present
       setUserName(storedUserName);
     }
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(getquestions);
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
    const fetchAnswers = async () => {
      try {
        console.log(userName);
        const response = await axios.get(getanswers,{userName});
        console.log(response);
        // setUserAnswers(response.data);
        // console.log(userAnswers); // Log the fetched user answers
      } catch (error) {
        console.error("Failed to fetch answers:", error);
      }
    };
    fetchAnswers();
  }, []);

  // Calculate total marks and display user's answers along with correct answers
  // useEffect(() => {
  //   let marks = 0;
  //   userAnswers.forEach((answer, index) => {
  //     if (answer === questions[index].correctAnswerIndex) {
  //       marks++;
  //     }
  //   });
  //   setTotalMarks(marks);
  // }, [userAnswers, questions]);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Your Test Report</h1>
      <p>Total Marks: {totalMarks}</p>
      <div className="grid gap-4">
        {questions.map((question, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Question {index + 1}</h2>
            <p className="mb-2">{question.question}</p>
            <p>Your Answer: {question.options[userAnswers[index]]}</p>
            <p>
              Correct Answer: {question.options[question.correctAnswerIndex]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Evaluation;
