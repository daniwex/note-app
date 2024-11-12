import React from 'react'
import Navbar from "../components/Navbar"

export default function layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='h-screen w-screen bg-bgLight100 text-black overflow-y-scroll'>
      <Navbar />
      <div className='sm:ml-[15.15%]'>
        {children}
      </div>
    </div>
  )
}
