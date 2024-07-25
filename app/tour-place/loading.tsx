import React from 'react'

const Loading = () => {
    return (
        <div className="grid lg:grid-cols-4 gap-3">
            {[...Array(16)].map((item, index) => (
                <div key={index} className="w-[300px] h-96 bg-slate-200 animate-pulse" />
            ))}
        </div>
    )
}

export default Loading