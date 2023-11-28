'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const LogOutButton = () => {
    const { data: session } = useSession();
  return (
    <button
                onClick={() => signOut()}
                className="text-gray-800 bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                {session?.user?.user_name} - Logout
              </button>
  )
}

export default LogOutButton