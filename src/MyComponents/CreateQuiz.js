import { TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import Question from './Question'
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import { Link } from 'react-router-dom';
// import { QuizzesRef } from '../App';


export default function CreateQuiz() {
    const container = {
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    };
    const [questions, setQuestions] = useState([]);
    const [quizID, setQuizID] = useState("");
    const [isFinished, setIsFinished] = useState(false);
    const [isIDAdded, setIsIDAdded] = useState(false);
    const finishQuiz = () => {
        setIsFinished(isFinished ? false : true);
    }

    const quizzesRef = collection(db, "Quizes");
    const addQuizID = async () => {
        if (quizID.length >= 6) {
            const currentQuizRef = await setDoc(doc(db, "Quizes", quizID), { id: quizID })
            const questionsRef = collection(db, `Quizes/${quizID}/questions`);
            questions.forEach((questionObj) => {
                addDoc(questionsRef, {
                    correctOption: questionObj.correctOption,
                    optionA: questionObj.optionA,
                    optionB: questionObj.optionB,
                    optionC: questionObj.optionC,
                    optionD: questionObj.optionD,
                    question: questionObj.question
                });
            })
            setIsIDAdded(isIDAdded ? false : true);
        }



    }

    return (
        <>
            <div className="container" style={container}>
                {!isFinished ? (
                    <>
                        <Question questions={questions} setQuestions={setQuestions} />
                        <Button onClick={finishQuiz} variant="contained">Finish Quiz</Button>
                    </>
                ) :
                    !isIDAdded ? <>
                        <TextField value={quizID} onChange={(e) => { setQuizID(e.target.value) }} id="demo-helper-text-misaligned-no-helper" label="Enter Quiz ID" />
                        <Button onClick={addQuizID} variant="contained">Add QuizID</Button>
                    </> :
                        <>
                            <Typography variant="h5" gutterBottom>
                                Quiz has been added with the ID : {`${quizID}`}
                            </Typography>
                            <Link to="/"><Button variant="outlined">Go to Home Page?</Button></Link>
                        </>}

            </div>

        </>
    )
}
