import { TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import Question from './Question'
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import { Link } from 'react-router-dom';
// import { QuizzesRef } from '../App';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function AttemptQuiz() {
    const [quizID, setQuizID] = useState("");
    const [quizFound, setQuizFound] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [isBegin, setIsBegin] = useState(false)
    const questionsArrtemp = [];
    const beginQuiz = () => {

    }
    const checkQuiz = async () => {


        if (quizID.length >= 6) {
            const quizRef = doc(db, "Quizes", quizID);
            const quizSnap = await getDoc(quizRef);

            if (quizSnap.exists()) {
                setQuizFound(true);
                const questionsRef = await getDocs(collection(db, `Quizes/${quizID}/questions`)).then((questionsArr) => {
                    questionsArr.forEach((questionObj) => {
                        console.log(questionObj.data());
                        questionsArrtemp.push(questionObj.data())

                    })


                })

                setQuestions(questionsArrtemp);
                // questionsRef.forEach((questionObj) => {
                //     setQuestions(questionObj.data().question)
                //     console.log(questions);
                // })


            } else {
                // doc.data() will be undefined in this case
                alert("Please enter a valid Quiz ID")
            }
        } else {

            alert("Please enter a valid Quiz ID")
        }
    }
    return (
        <>
            {!quizFound ? (
                <>
                    <TextField value={quizID} onChange={(e) => { setQuizID(e.target.value) }} id="outlined-disabled" label="Quiz ID" />
                    <Button onClick={checkQuiz} sx={{ height: 30 }} variant="outlined">Attempt</Button>
                </>
            ) : isBegin ?
                <>
                    <div className="container">
                        {questions.map((questionObj) => {
                            return (
                                <h1></h1>
                            )
                        })}
                    </div>
                </> : <Button onClick={() => {
                    setIsBegin(isBegin ? false : true);
                    console.log(questions);
                    beginQuiz();
                }} sx={{ height: 30 }} variant="outlined">Begin Quiz</Button>}

        </>
    )
}
