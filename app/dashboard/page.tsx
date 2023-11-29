import { getServerSession } from "next-auth"
import React from 'react'
import { options } from '../api/auth/[...nextauth]/options'

const Dashboard = async () => {
  const session = await getServerSession(options);
    
  return (
    <>
      <div>Dashboard</div>
    <p>{session?.user?.user_login}</p>
    </>
  
  )
}

export default Dashboard