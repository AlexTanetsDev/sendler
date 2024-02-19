'use client';

import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import Image from 'next/image';

import Title from '@/components/Title';
import GreenButton from '@/components/buttons/GreenButton';
import Select from '@/components/Select';
import SelectTime from '@/components/SelectTime';
import AddAlfaNameForm from '@/components/forms/AddAlfaNameForm';
import AddClientPhoneNumberForm from '@/components/forms/AddClientPhoneNumberForm';
import RecipientsForm from '@/components/forms/RecipientsForm';

import { getUserGroups } from '@/fetch-actions/groupsFetchActions';
import { getUser } from '@/fetch-actions/usersFetchActions';
import { sendSMS } from '@/fetch-actions/smsFetchActions';

const MailingList = ({ params }: { params: { userId: string } }) => {

	const userId = Number(params.userId);

	const [charCount, setCharCount] = useState<number>(0);
	const [smsCount, setSmsCount] = useState<number>(0);
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [isOpened, setIsOpened] = useState<boolean>(false)
	const [userName, setUserName] = useState<string>('');
	const [userNames, setUserNames] = useState<string[] | undefined>([]);
	const [groupName, setGroupName] = useState<string>('');
	const [hour, setHour] = useState<string>('00');
	const [minute, setMinute] = useState<string>('00');
	const [second, setSecond] = useState<string>('00');
	const [groupsNameArray, setGroupsNameArray] = useState<string[] | undefined>([]);
	const [date, setDate] = useState('');
	const [recipients, setRecipients] = useState<(string | number)[]>([]);
	const [contentSMS, setContentSMS] = useState<string>('');


	const getTimeOptionsValus = (min: number, max: number) => {
		const optionsArray = [];
		for (let i = min; i <= max; i += 1) {
			optionsArray.push(i.toString().padStart(2, '0'));
		}
		return optionsArray;
	};

	const getUserName = (item: string) => {
		setUserName(item);
	};

	const getUserNamesArray = async (id: number) => {
		const res = await getUser(userId);
		const user = res?.data.user
		setUserNames(user?.alfa_names_active);
	};

	const getRecipients = (recipientsArray: (string | number)[]) => {
		setRecipients(recipientsArray);
	}

	const getGroupName = (item: string) => {
		setGroupName(item);
	};

	const getHour = (item: string) => {
		setHour(item);
	};

	const geMinute = (item: string) => {
		setMinute(item);
	};

	const getSecond = (item: string) => {
		setSecond(item);
	};

	const getIsOpened = () => {
		setIsOpened(!isOpened)
	};

	const handleChange = (e: any) => {
		setContentSMS(e.target.value);
	};

	const handleClickAddGroup = () => {
		if (groupName) {
			const recipientsArray = [...recipients, groupName];
			setRecipients(recipientsArray);
		};
	};

	const handleClickAddPhoneNumber = (tel: number) => {
		if (tel) {
			const recipientsArray = [...recipients, tel];
			setRecipients(recipientsArray);
		}
	};

	const handleClickAddUserName = () => {
		setContentSMS(contentSMS + ' ' + `%UserName%`);
	};

	const handleClickParam1 = () => {
		setContentSMS(contentSMS + ' ' + `%Param1%`);
	};

	const handleClickParam2 = () => {
		setContentSMS(contentSMS + ' ' + `%Param2%`);
	};

	const handleClickChecked = () => {
		setIsChecked(!isChecked);
		if (isChecked == false) {
			setDate('');
			setHour('00');
			setMinute('00');
			setSecond('00');
		}
	}

	const getData = async () => {
		const resGroups = await getUserGroups(userId);
		const groupsName = resGroups?.map((group) => group.group_name);
		setGroupsNameArray(groupsName);
	};

	const onChange = (e: any) => {
		setDate(e.target.value);
	};

	const memoizedgetData = useCallback(getData, [userId]);
	const memoizedgetUserNamesArray = useCallback(getUserNamesArray, [userId]);

	useEffect(() => {
		memoizedgetData();
		memoizedgetUserNamesArray(userId);
	}, [memoizedgetData, memoizedgetUserNamesArray, userId, recipients, groupsNameArray]);

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
					<p className=" text-mainTextColor font-normal text-xl mt-[50px] label">Ім’я відправника</p>
					<div className="flex gap-8 items-center mt-3">
						<Select selectOptions={userNames} getSelect={getUserName} selectedOption={userName} widthValue={474} startValue='Обрати' />
						<GreenButton size="normal" onClick={getIsOpened}>
							Додати ім’я
						</GreenButton>
					</div>
					{isOpened &&
						<AddAlfaNameForm userId={userId} getUserNamesArray={getUserNamesArray} getIsOpened={getIsOpened} />}
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
							<textarea value={contentSMS} onChange={handleChange} placeholder="Text SMS" className="resize-none w-[636px] h-[220px] p-3 rounded-[18px] border-[1px] border-[#E6E6E6] mt-2 input"></textarea>
						</div>
						<div className="flex flex-col gap-[18px] justify-center">
							<span className=" text-base text-mainTextColor">Додати шаблон</span>
							<button type='button' onClick={handleClickAddUserName} className="text-base text-emailColorLink cursor-pointer">Ім&#39;я клієнта</button>
							<button type='button' onClick={handleClickParam1} className="text-base text-emailColorLink cursor-pointer">Параметр 1</button>
							<button type='button' onClick={handleClickParam2} className="text-base text-emailColorLink cursor-pointer">Параметр 2</button>
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
						<RecipientsForm recipients={recipients} getRecipients={getRecipients} />
						<div className="flex flex-col gap-8 justify-start">
							<AddClientPhoneNumberForm handleClick={handleClickAddPhoneNumber} />
							<div>
								<Select selectOptions={groupsNameArray} getSelect={getGroupName} selectedOption={groupName} widthValue={474} startValue='Обрати' />
								<button onClick={handleClickAddGroup} className="mt-2 text-emailColorLink cursor-pointer">Додати групу до списку</button>
							</div>
						</div>
					</div>
				</div>
				<span className="flex items-center gap-1">
					{!isChecked ? (
						<Image
							src="/svg/checkbox-empty.svg"
							width={24}
							height={24}
							alt="Check box"
							onClick={handleClickChecked}
						/>
					) : (
						<Image
							src="/svg/checkbox-checked.svg"
							width={24}
							height={24}
							alt="Check box checked"
							onClick={handleClickChecked}
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
						onChange={onChange}
						className="w-[250px] h-12 rounded-[18px] border border-inputBorder outline-none text-xl text-mainTextColor pr-[50px] pl-[50px] cursor-pointer"
					/>
					<p className=" text-xl text-mainTextColor mb-[13px] mt-[32px]">{'Час (з,по)'}</p>
					<div className="flex gap-3 mt-3 items-center">
						<SelectTime selectOptions={getTimeOptionsValus(1, 24)} getSelect={getHour} selectedOption={hour} widthValue={150} startValue='00' />
						<SelectTime selectOptions={getTimeOptionsValus(1, 60)} getSelect={geMinute} selectedOption={minute} widthValue={150} startValue='00' />
						<SelectTime selectOptions={getTimeOptionsValus(1, 60)} getSelect={getSecond} selectedOption={second} widthValue={150} startValue='00' />
					</div>
				</div>
			)}
			<div className="flex justify-center mt-[50px]">
				<GreenButton
					size="big"
					onClick={async () => {
						await sendSMS(userName, recipients, contentSMS, date, `${hour}.${minute}.${second}`, 'api');
					}}>
					Надіслати
				</GreenButton>
			</div>
		</>
	);
};

export default MailingList;
