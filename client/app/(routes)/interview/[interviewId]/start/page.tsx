"use client"
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'

const StartInterview = () => {
    const {interviewId} = useParams();
    const convex = useConvex();

    useEffect(()=>{
        GetInterviewQuestions();
    },[interviewId])

    const GetInterviewQuestions=async ()=>{
        const result = await convex.query(api.Interview.GetInterviewQuestions,{
            //@ts-ignore
            interviewRecordId:interviewId 
        })
    }
  return (
    <div>
      start interview
    </div>
  )
}

export default StartInterview
