import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req:NextResponse){
    const {messages}= await req.json();
    const result = await axios.post('https://your-api-endpoint.com/interview-feedback', { messages:JSON.stringify(messages) });
    console.log(result);
    return NextResponse.json(result.data?.message?.content);
}