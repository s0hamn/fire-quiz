import React, { useState } from 'react'
import { Button, TextField } from "@mui/material";
import { Outlet, Link } from "react-router-dom";
import { addDoc, doc, setDoc } from 'firebase/firestore';
import { QuizzesRef } from '../App';
import { db } from '../firebase-config';
export default function Layout() {
    return (
        <>
            <Link to="/createquiz"><Button variant="outlined">Create Quiz</Button></Link>
            <Link to="/attemptquiz"><Button variant="outlined">Attempt Quiz</Button></Link>



            <Outlet />
        </>

    )
}
