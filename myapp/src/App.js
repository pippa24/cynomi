import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Results from './Results'
import { AddUser } from './AddUser'

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<AddUser />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
  );
}
export default App;
