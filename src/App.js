import { Button, TextField } from "@mui/material";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from './firebase-config';
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateQuiz from './MyComponents/CreateQuiz'
import AttemptQuiz from './MyComponents/AttemptQuiz'
import Home from './MyComponents/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="attemptquiz" element={<AttemptQuiz />} />
          <Route path="createquiz" element={<CreateQuiz />} />
        </Routes>
      </BrowserRouter>



    </>

  );
}

export default App;
