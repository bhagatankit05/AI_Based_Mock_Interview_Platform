import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const JobDescription = ({ onHandleInputChange }: any) => {
    return (
        <div className='border rounded-2xl p-10 '>
            <div>
                <label htmlFor="">Job Title</label>
                <Input placeholder='Ex.Full Stack Developer'
                    onChange={(event) => onHandleInputChange('jobtitle', event.target.value)} />
            </div>

            <div className='mt-6'>
                <label htmlFor="">Job Description</label>
                <Textarea placeholder='Enter or Paste Job Description.' className='h-[200px]'
                    onChange={(event) => onHandleInputChange('jobDescritption', event.target.value
                    )} />
            </div>
        </div>
    )
}

export default JobDescription
