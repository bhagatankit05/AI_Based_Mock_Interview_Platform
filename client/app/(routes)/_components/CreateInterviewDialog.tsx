import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResumeUpload from './ResumeUpload'
import JobDescription from './JobDescription'
import { DialogClose } from '@radix-ui/react-dialog'
import axios from 'axios'

const CreateInterviewDialog = () => {

    const [formData,setFormData] = useState<any>();
    const [file,setFile]=useState<File|null>();
    const [loading,setLoading]=useState(false)

    const onHandleInputChange = (field:string , value:string)=>{
        setFormData((prev:any)=>({
            ...prev,
            [field]:value
        }))
    }

    const onSubmit= async ()=>{
        if(!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('file',file)

        try {
            const result = await axios.post('/api/generate-interview-questions',formData)
            console.log(result.data)
            
        } catch (e) {
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button className=''>+ Create Interview</Button>
            </DialogTrigger>
            <DialogContent className='min-w-3xl'>
                <DialogHeader>
                    <DialogTitle>Please Submit Following Details</DialogTitle>
                    <DialogDescription>

                        <Tabs defaultValue="upload-resume" className="w-full mt-5">
                            <TabsList>
                                <TabsTrigger value="upload-resume">Upload Resume</TabsTrigger>
                                <TabsTrigger value="job-description">Job Description</TabsTrigger>
                            </TabsList>
                            <TabsContent value="upload-resume"><ResumeUpload setFiles={(file:File)=>setFile(file)}/></TabsContent>
                            <TabsContent value="job-description"><JobDescription onHandleInputChange={onHandleInputChange}/></TabsContent>
                        </Tabs>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='flex gap-6'>
                    <DialogClose>
                        <Button variant={'ghost'}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={onSubmit} disabled={loading || !file}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateInterviewDialog
