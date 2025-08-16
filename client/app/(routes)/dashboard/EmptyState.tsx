import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='mt-14 flex flex-col items-center gap-5 border-dashed p-10 border-4 rounded-2xl bg-gray-50'>
      <Image 
        src="/interview.svg" 
        alt="EmptyState" 
        width={330} 
        height={330} 
      />
      <h2 className='mt-2 text-lg text-gray-500'>You do not have any Interview created.</h2>

      <Button className=''>+ Create Interview</Button>
    </div>
  )
}

export default EmptyState
