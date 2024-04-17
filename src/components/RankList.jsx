import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link ,useNavigate } from "react-router-dom";
import { getSubmissions } from "../API/ApiRoutes";

const RankList = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserName = sessionStorage.getItem("name");
    if (!storedUserName) {
      navigate("/"); // Navigate to login page if no session storage data
      return;
    }

    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(getSubmissions);
        setSubmissions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      }
    };

    fetchSubmissions();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <header className="bg-white shadow-sm flex justify-between items-center p-4">
        <div>
          <p className="text-lg font-semibold">Rank List</p>
        </div>
        <div>
          <Link
            to="/test"
            className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md shadow-sm text-white font-semibold focus:outline-none"
          >
            Back to Test
          </Link>
        </div>
      </header> */}
      <div className="max-w-lg mx-auto my-8 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Rank List</h1>
        {loading ? (
          <p>Loading rank list...</p>
        ) : (
          <ul>
            {submissions.map((submission, index) => (
              <li
                key={index}
                className="border-b border-gray-200 py-4 flex justify-between items-center"
              >
                <span className="text-lg">
                  {index + 1}. Name: {submission.name}, Score:{" "}
                  {submission.score}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RankList;
