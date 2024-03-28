import React from 'react'


const Edit = ({ params }: { params: { userId: string } }) => {
  const userId = Number(params.userId);

  return (
    <div>Edit {userId}</div>
  )
}

export default Edit