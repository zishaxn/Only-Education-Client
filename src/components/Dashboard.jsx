import React from 'react'
import Evaluation from './Evaluation'
import RankList from './RankList'
import { Link} from "react-router-dom";
const Reports = () => {
  return (
    <div>
      <header className="bg-white shadow-sm flex justify-between items-center p-4">
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
      </header>
      <Evaluation />
      <RankList />
    </div>
  );
}

export default Reports
