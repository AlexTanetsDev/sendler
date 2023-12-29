"use client";
import Title from "@/components/Title";
import AddBtn from "@/components/buttons/AddBtn";
import React from "react";

const mailingList = () => {
  return (
    <>
      <Title type="h1" color="dark">
        Розсилка SMS
      </Title>
      <div className="flex flex-col gap-[80px] pt-[60px]">
        <div className="sms-page-box">
          <p className="w-[724px] text-mainTextColor text-base font-montserrat">
            Виберіть підпис (Ім&#39;я відправника), який буде відображатися
            замість номера відправника SMS-повідомлення
          </p>
          <p className=" text-mainTextColor font-normal text-xl mt-[50px]">
            Ім’я відправника
          </p>
          <div className="flex gap-8 items-center mt-3">
            <span className=" w-[474px] bg-white h-12 rounded-[18px] border-[1px] border-[#E6E6E6] "></span>
            <AddBtn handleClick={() => {}}>Додати ім’я</AddBtn>
          </div>
        </div>
        <div className="sms-page-box"></div>
        <div className="sms-page-box"></div>
      </div>
    </>
  );
};

export default mailingList;
