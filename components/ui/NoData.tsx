import Link from 'next/link'
import React from 'react'

const NoData = ({ title, LinkUrl }) => {
    return (
        <div className='flex justify-center items-center min-h-[70vh] dark'>
            <div className='flex flex-col gap-2 items-center'>
                <p>
                    {title}
                </p>
                <Link href={LinkUrl} className='bg-blue-50 text-blue-500 shadow-sm hover:shadow px-3 py-1 rounded'>
                    Go back
                </Link>
            </div>
        </div>
    )
}

export default NoData