'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { MdKeyboardBackspace } from "react-icons/md";

const BackButton = () => {
    const router = useRouter()
  return (
    <button onClick={() => router.back()} className='flex items-center gap-2 border border-blue-200 px-1 lg:px-3 lg:py-1 rounded shadow-sm hover:shadow hover:bg-blue-200 bg-blue-50 transition-all duration-500 '>
        <MdKeyboardBackspace className='text-lg max-sm:text-sm' /> <span className='text-sm max-sm:text-xs'>Back</span>
    </button>
  )
}

export default BackButton