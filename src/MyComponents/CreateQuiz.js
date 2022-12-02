import { TextField, Button, Typography } from '@mui/material';
import React, { useState } from 'react'
import Question from './Question'
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase-config';
import { Link } from 'react-router-dom';
// import { QuizzesRef } from '../App';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CreateQuiz() {
    const row = {
        display: "flex",
        margin: "10px 0",
        justifyContent: "space-between"
    }
    const container = {
        height: "100vh",
        paddingTop: "10px"
    };
    const allQuestions = {

        marginTop: "30px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    }
    const [questions, setQuestions] = useState([]);
    const [quizID, setQuizID] = useState("");
    const [isFinished, setIsFinished] = useState(false);
    const [isIDAdded, setIsIDAdded] = useState(false);
    const finishQuiz = () => {
        if (questions.length >= 1) {
            setIsFinished(isFinished ? false : true);
        } else {
            alert("Please add atleast 1 question to the quiz")
        }
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
        } else {
            alert("Please enter a quiz ID with more than 6 characters");
        }



    }

    return (
        <>
            <div className="container" style={container}>
                {!isFinished ? (
                    <>
                        <Question questions={questions} setQuestions={setQuestions} />
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button sx={{ marginTop: 2 }} onClick={finishQuiz} variant="contained">Finish Quiz</Button>
                        </div>
                    </>
                ) :
                    !isIDAdded ? <>
                        {questions.map((question) => {
                            return (
                                <>
                                    <div style={allQuestions}>
                                        <div className="question" style={{ marginTop: "10px" }}>
                                            <TextField sx={{
                                                width: { md: 500 }
                                            }} value={question.question} disabled id="outlined-disabled" label="Question" />
                                        </div>
                                        <div className="options">
                                            <div className="row" style={row}>
                                                <div className="option">
                                                    <TextField disabled
                                                        value={question.optionA} id="demo-helper-text-misaligned-no-helper" label="Option A" />
                                                </div>
                                                <div className="option">
                                                    <TextField disabled
                                                        sx={{
                                                            marginLeft: 2
                                                        }}
                                                        value={question.optionB} id="demo-helper-text-misaligned-no-helper" label="Option B" />
                                                </div>
                                            </div>
                                            <div className="row" style={row}>
                                                <div className="option">
                                                    <TextField disabled sx={{
                                                        marginRight: 2
                                                    }} value={question.optionC} id="demo-helper-text-misaligned-no-helper" label="Option C" />
                                                </div>
                                                <div className="option">
                                                    <TextField disabled sx={{
                                                        marginLeft: 2
                                                    }} value={question.optionD} id="demo-helper-text-misaligned-no-helper" label="Option D" />
                                                </div>
                                            </div>
                                        </div>
                                        <FormControl disabled style={{ marginBottom: "40px" }} fullWidth>
                                            <InputLabel id="demo-simple-select-label">Correct Option</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={question.correctOption}
                                                label="Correct Option"
                                            >
                                                <MenuItem value="optionA">Option A</MenuItem>
                                                <MenuItem value="optionB">Option B</MenuItem>
                                                <MenuItem value="optionC">Option C</MenuItem>
                                                <MenuItem value="optionD">Option D</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </>
                            )

                        })}

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
