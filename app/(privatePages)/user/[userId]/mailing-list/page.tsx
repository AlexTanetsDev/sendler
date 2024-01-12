'use client';
import { getTimeArr } from '@/app/utils/timeArrays';
import Title from '@/components/Title';
import GreenButton from '@/components/buttons/GreenButton';
import DateTimePicker from '@/components/smsSendingPage/DateTimePicker';
import Image from 'next/image';
import React, { useState } from 'react';

const MailingList = () => {
  const [charCount, setCharCount] = useState<number>(0);
  const [smsCount, setSmsCount] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [minutesHours] = useState(getTimeArr());
  // time picker state
  // from
  const [fromHour, setFromHour] = useState<string>('00');
  const [fromMinute, setFromMinute] = useState<string>('00');
  const [fromSec, setFromSec] = useState<string>('00');
  // to
  const [toHour, setToHour] = useState<string>('23');
  const [toMinute, setToMinute] = useState<string>('59');
  const [toSec, setToSec] = useState<string>('59');

  return (
    <>
      <Title type="h1" color="dark">
        Розсилка SMS
      </Title>
      <div className="flex flex-col gap-[80px] pt-[60px]">
        <div className="sms-page-box">
          <p className="w-[724px] text-mainTextColor text-base font-montserrat">
            Виберіть підпис (Ім&#39;я відправника), який буде відображатися замість номера
            відправника SMS-повідомлення
          </p>
          <p className=" text-mainTextColor font-normal text-xl mt-[50px]">Ім’я відправника</p>
          <div className="flex gap-8 items-center mt-3">
            <span className=" w-[474px] bg-white h-12 rounded-[18px] border-[1px] border-[#E6E6E6] flex justify-center px-7">
              <Image
                src="/svg/arrow-down.svg"
                alt="Arrov dovn icon"
                width={32}
                height={32}
                className="ml-auto cursor-pointer"
              />
            </span>
            <GreenButton size="normal" onClick={() => null}>
              Додати ім’я
            </GreenButton>
          </div>
        </div>

        <div className="sms-page-box">
          <p className="w-[724px] text-mainTextColor text-base font-montserrat">
            Введіть SMS-повідомлення. Слідкуйте за розміром повідомлення. Пам&#39;ятайте: для
            кирилиці в одній SMS може поміститися 70 знаків, для латиниці - 160 символів.
          </p>
          <p className=" text-mainTextColor font-normal text-xl mt-[50px]">Текст повідомлення</p>
          <div className="flex gap-8">
            <div className=" inline-block mt-1">
              <div className="flex justify-end gap-5 font-roboto text-sm text-mainTextColor">
                {' '}
                <span>Символів: {charCount}</span>
                <span>SMS: {smsCount}</span>
              </div>
              <textarea className=" resize-none w-[636px] bg-white h-[220px] rounded-[18px] border-[1px] border-[#E6E6E6] mt-2"></textarea>
            </div>
            <div className="flex flex-col gap-[18px] justify-center">
              <span className=" text-base text-mainTextColor">Додати шаблон</span>
              <span className="text-base text-emailColorLink cursor-pointer">Ім&#39;я клієнта</span>
              <span className="text-base text-emailColorLink cursor-pointer">Параметр 1</span>
              <span className="text-base text-emailColorLink cursor-pointer">Параметр 2</span>
            </div>
          </div>
        </div>
        <div className="sms-page-box">
          <p className="w-[724px] text-mainTextColor text-base font-montserrat">
            Виберіть групу контактів, якій Ви бажаєте надіслати SMS-повідомлення. У Вас є можливість
            ввести новий номер або вибрати один із контактів.
          </p>
          <p className=" text-mainTextColor font-normal text-xl mt-[50px]">
            Групи та номери телефонів, яким буде надіслано SMS- повідомлення
          </p>
          <div className="flex gap-8 mt-8 mb-8">
            <div className=" w-[611px] h-[336px] rounded-[18px] border-[1px] border-[#E6E6E6] bg-white"></div>
            <div className="flex flex-col gap-8 justify-center">
              <div>
                <span className=" w-[474px] bg-white h-12 rounded-[18px] border-[1px] border-[#E6E6E6] flex justify-center px-7">
                  <Image
                    src="/svg/arrow-down.svg"
                    alt="Arrov dovn icon"
                    width={32}
                    height={32}
                    className="ml-auto cursor-pointer"
                  />
                </span>
                <p className=" mt-2 text-emailColorLink cursor-pointer">Додати групу до списку</p>
              </div>
              <div>
                <span className=" w-[474px] bg-white h-12 rounded-[18px] border-[1px] border-[#E6E6E6] flex justify-center px-7">
                  <Image
                    src="/svg/arrow-down.svg"
                    alt="Arrov dovn icon"
                    width={32}
                    height={32}
                    className="ml-auto cursor-pointer"
                  />
                </span>
                <p className=" mt-2 text-emailColorLink cursor-pointer">Додати контакт до списку</p>
              </div>
              <div>
                <span className=" w-[474px] bg-white h-12 rounded-[18px] border-[1px] border-[#E6E6E6] flex justify-center px-7"></span>
                <p className=" mt-2 text-emailColorLink cursor-pointer">Додати телефон до списку</p>
              </div>
            </div>
          </div>
          <span className=" text-lg text-emailColorLink mr-5 cursor-pointer">Видалити обране</span>
          <span className=" text-lg text-emailColorLink cursor-pointer">Очистити</span>
        </div>
        <span className="flex items-center gap-1">
          {!isChecked ? (
            <Image
              src="/svg/checkbox-empty.svg"
              width={24}
              height={24}
              alt="Check box"
              onClick={() => setIsChecked(!isChecked)}
            />
          ) : (
            <Image
              src="/svg/checkbox-checked.svg"
              width={24}
              height={24}
              alt="Check box checked"
              onClick={() => setIsChecked(!isChecked)}
            />
          )}
          Заплановане розсилання
        </span>
      </div>
      {isChecked && (
        <div className="sms-page-box mt-[80px]">
          {' '}
          <p className=" text-xl text-mainTextColor mb-[13px]">Дата</p>
          <input
            type="date"
            name=""
            id=""
            className="w-[250px] h-12 rounded-[18px] border border-inputBorder outline-none text-xl text-mainTextColor pr-[50px] pl-[50px] cursor-pointer"
          />
          <p className=" text-xl text-mainTextColor mb-[13px] mt-[32px]">{'Час (з,по)'}</p>
          <div className="flex gap-3  mt-3 items-center">
            <DateTimePicker
              handlePick={el => setFromHour(el)}
              timeArr={minutesHours.hoursArray}
              pickerState={fromHour}
            />
            <DateTimePicker
              handlePick={el => setFromMinute(el)}
              timeArr={minutesHours.minutesArray}
              pickerState={fromMinute}
            />
            <DateTimePicker
              handlePick={el => setFromSec(el)}
              timeArr={minutesHours.minutesArray}
              pickerState={fromSec}
            />
            <span className=" h-px w-6 bg-black mx-4"></span>
            <DateTimePicker
              handlePick={el => setToHour(el)}
              timeArr={minutesHours.hoursArray}
              pickerState={toHour}
            />
            <DateTimePicker
              handlePick={el => setToMinute(el)}
              timeArr={minutesHours.minutesArray}
              pickerState={toMinute}
            />
            <DateTimePicker
              handlePick={el => setToSec(el)}
              timeArr={minutesHours.minutesArray}
              pickerState={toSec}
            />
          </div>
        </div>
      )}
      <div className="flex justify-center mt-[50px]">
        <GreenButton size="big" onClick={() => null}>
          Надіслати
        </GreenButton>
      </div>
    </>
  );
};

export default MailingList;
