import React, { useContext, useState } from 'react'
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
import { Loader2Icon } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { UserDetailContext } from '@/context/UserDetailContext'

const CreateInterviewDialog = () => {
    const [formData, setFormData] = useState<any>();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const saveInterviewQuestion = useMutation(api.Interview.SaveInterviewQuestion);

    const onHandleInputChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value
        }))
    }

    const onSubmit = async () => {
        setLoading(true);

        const formData_ = new FormData();
        formData_.append('file', file??' ');
        formData_?.append('jobTitle', formData?.jobTitle);
        formData_?.append('jobDescription', formData?.jobDescription);

        try {
            const result = await axios.post('/api/generate-interview-question', formData_);
            console.log("Response:", result.data);

            if (result?.data?.status === 429) {
                console.log(result?.data?.result)
                return
            }

            //Save to database;
            //@ts-ignore
            const resp = await saveInterviewQuestion({
                questions: result.data?.questions,
                resumeUrl: result?.data.resumeUrl,
                uid: userDetail?._id,
                jobTitle: formData?.jobTitle,
                jobDescription: formData?.jobDescription
            })

        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error("Axios error:", e.response?.data || e.message);
            } else {
                console.error("Unexpected error:", e);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button>+ Create Interview</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl w-full">
                <DialogHeader>
                    <DialogTitle>Please Submit Following Details</DialogTitle>
                    <DialogDescription>
                        <Tabs defaultValue="upload-resume" className="w-full mt-5">
                            <TabsList>
                                <TabsTrigger value="upload-resume">Upload Resume</TabsTrigger>
                                <TabsTrigger value="job-description">Job Description</TabsTrigger>
                            </TabsList>
                            <TabsContent value="upload-resume">
                                <ResumeUpload setFiles={(file: File) => setFile(file)} />
                            </TabsContent>
                            <TabsContent value="job-description">
                                <JobDescription onHandleInputChange={onHandleInputChange} />
                            </TabsContent>
                        </Tabs>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-6">
                    <DialogClose>
                        <Button variant="ghost">Cancel</Button>
                    </DialogClose>
                    <Button onClick={onSubmit} disabled={loading || !file}>
                        {loading && <Loader2Icon className='animate-spin' />} Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateInterviewDialog
