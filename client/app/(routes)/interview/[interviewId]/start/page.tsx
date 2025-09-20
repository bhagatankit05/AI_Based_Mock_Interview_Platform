"use client"
import { api } from '@/convex/_generated/api';
import axios from 'axios';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type InterviewData = {
  jobTitle: string | null,
  jobDescription: string | null,
  interviewQuestions: InterviewQuestions[],
  userId: string | null,
  _id: string
}

type InterviewQuestions = {
  answer: string,
  question: string
}
const StartInterview = () => {
  const { interviewId } = useParams();
  const convex = useConvex();
  const [interviewData, setInterviewData] = useState<InterviewData>();


  useEffect(() => {
    GetInterviewQuestions();
  }, [interviewId])

  const GenerateFeedback= async()=>{
    const result = await axios.post('/api/generate-feedback',{
      messages:messages});
  }

  const GetInterviewQuestions = async () => {
    const result = await convex.query(api.Interview.GetInterviewQuestions, {
      //@ts-ignore
      interviewRecordId: interviewId
    });
    console.log(result);
    setInterviewData(result);
  }
  return (
    <div>
      start interview
    </div>
  )
}

export default StartInterview
