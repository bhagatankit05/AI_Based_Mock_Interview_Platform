import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Interview = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-24'>
      <div className='max-w-3xl w-full'>
        <Image src={'/'} alt="Interview Image" width={600} height={400} className='w-full h-[200px] object-cover' />
        <div className='p-6 flex flex-col items-center space-y-5'>
          <h2 className='font-bold text-3xl text-center'>
            Ready to Start Interview?
          </h2>
          <p className='text-gray-500 text-center'>The Interview will last 30 minutes. Are you ready to begin?</p>
          <Button>Start Interview <ArrowRight /></Button>

          <hr />
          
        </div>
      </div>
    </div>
  )
}

export default Interview
