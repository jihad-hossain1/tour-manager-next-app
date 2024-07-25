'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { MdKeyboardBackspace } from "react-icons/md";

const BackButton = () => {
    const router = useRouter()
  return (
    <button onClick={() => router.back()} className='flex items-center gap-2 border border-blue-200 px-3 py-1 rounded shadow-sm hover:shadow hover:bg-blue-200 bg-blue-50 transition-all duration-500 text-sm'>
        <MdKeyboardBackspace className='text-lg' /> Back
    </button>
  )
}

export default BackButton