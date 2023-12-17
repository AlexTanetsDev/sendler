import React from 'react'

type Props = {
    openModal:() => void;
}

export const FeedbackButton:React.FC<Props> = ({openModal}) => {
  return (
    <button onClick={openModal} className=" bg-greyButton py-[18px] w-[219px] rounded-[18px] focus:outline-none hover:bg-blue-700 hover:text-white text-lg">Зв’язатись</button>
  )
}