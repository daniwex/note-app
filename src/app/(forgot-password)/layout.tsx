import React from 'react'

export default function page({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen bg-bgLight100 flex justify-center items-center">
     {children}
    </div>
  )
}
