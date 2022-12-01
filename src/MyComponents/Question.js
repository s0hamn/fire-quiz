import React from 'react'
import { Button, TextField } from '@mui/material'
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
export default function Question({ setQuestions, questions }) {
    const [question, setQuestion] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [correctOption, setCorrectOption] = useState("");
    const row = {
        display: "flex",
        margin: "10px 0"
    }

    const addQuestion = () => {
        const questionObj = {
            correctOption: correctOption,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD,
            question: question
        }
        setQuestions([...questions, questionObj])

    }
    return (
        <>
            <div className="container">
                <div className="question">
                    <TextField value={question} onChange={(e) => { setQuestion(e.target.value) }} id="demo-helper-text-misaligned-no-helper" label="Question" />
                </div>
                <div className="options">
                    <div className="row" style={row}>
                        <div className="option">
                            <TextField value={optionA} onChange={(e) => { setOptionA(e.target.value) }} id="demo-helper-text-misaligned-no-helper" label="Option A" />
                        </div>
                        <div className="option">
                            <TextField value={optionB} onChange={(e) => { setOptionB(e.target.value) }} id="demo-helper-text-misaligned-no-helper" label="Option B" />
                        </div>
                    </div>
                    <div className="row" style={row}>
                        <div className="option">
                            <TextField value={optionC} onChange={(e) => { setOptionC(e.target.value) }} id="demo-helper-text-misaligned-no-helper" label="Option C" />
                        </div>
                        <div className="option">
                            <TextField value={optionD} onChange={(e) => { setOptionD(e.target.value) }} id="demo-helper-text-misaligned-no-helper" label="Option D" />
                        </div>
                    </div>
                </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Correct Option</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={correctOption}
                        label="Correct Option"
                        onChange={(e) => {
                            setCorrectOption(e.target.value)
                        }}
                    >
                        <MenuItem value="optionA">Option A</MenuItem>
                        <MenuItem value="optionB">Option B</MenuItem>
                        <MenuItem value="optionC">Option C</MenuItem>
                        <MenuItem value="optionD">Option D</MenuItem>
                    </Select>
                </FormControl>
                <Button onClick={addQuestion} variant="contained">Add Question</Button>

            </div>
        </>
    )
}
