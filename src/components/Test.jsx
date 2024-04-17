import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getquestions, saveResult } from "../API/ApiRoutes";
import Reports from "./Dashboard";

const Test = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(5).fill(null)); // Array to store user answers, initially null
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [testCompleted, setTestCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(getquestions);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();

    // Get user name and email from session storage
    const storedUserName = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");
    if (!storedUserName || !storedEmail) {
      // If name or email is not present, navigate to login page
      navigate("/");
    } else {
      // Set the user name if present
      setUserName(storedUserName);
    }
  }, [navigate]); // Ensure navigate is added as a dependency to useEffect

  const handleAnswer = (selectedOptionIndex) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = selectedOptionIndex;
      return updatedAnswers;
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((answerIndex, index) => {
      if (answerIndex === questions[index].correctAnswerIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmitTest = async () => {
    const score = calculateScore();
    try {
      console.log(userAnswers);
      await axios.post(saveResult, { name: userName, score, userAnswers }); // Include userAnswers in the POST request
      setTestCompleted(true);
    } catch (error) {
      console.error("Failed to save result:", error);
    }
  };


  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    // Navigate to the login page
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm flex justify-between items-center p-4">
        <div>
          {userName && (
            <p className="text-lg font-semibold">Welcome, {userName}!</p>
          )}
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md shadow-sm text-white font-semibold focus:outline-none"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="max-w-lg mx-auto my-8 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Test Page</h1>
        {loading ? (
          <p>Loading questions...</p>
        ) : currentQuestionIndex < questions.length ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestionIndex + 1}
            </h2>
            <p className="mb-4">{questions[currentQuestionIndex].question}</p>
            <ul>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li key={index} className="mb-2">
                  <button
                    onClick={() => handleAnswer(index)}
                    className={
                      "w-full py-2 px-4 rounded-md shadow-sm text-white font-semibold focus:outline-none " +
                      (userAnswers[currentQuestionIndex] !== null &&
                      index ===
                        questions[currentQuestionIndex].correctAnswerIndex
                        ? "bg-green-500"
                        : userAnswers[currentQuestionIndex] === index
                        ? "bg-red-500"
                        : "bg-blue-500 hover:bg-blue-600")
                    }
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
            {userAnswers[currentQuestionIndex] !== null && (
              <button
                onClick={handleNextQuestion}
                className="mt-6 bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md shadow-sm text-white font-semibold focus:outline-none"
              >
                Submit
              </button>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Test Completed!</h2>
            <Link
              to="/dashboard"
              onClick={handleSubmitTest}
              className="mt-6 bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md shadow-sm text-white font-semibold focus:outline-none"
            >
              See Report
            </Link>

            {testCompleted && <p>Test result submitted successfully!</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
