'use client'

import { useRouter } from "next/navigation";


const BackBtn = () => {
  const router = useRouter();

  const handlePrevClick = () => {
    router.back();
  };

  return (
    <div>
      <button className="bg-headerTable text-white text-xl font-roboto  leading-[30px] py-2 px-3 border-slate-400 rounded-xl hover:bg-hoverGreenBtn" onClick={handlePrevClick}>{"<< Назад"}</button>
    </div>
  );
};

export default BackBtn;