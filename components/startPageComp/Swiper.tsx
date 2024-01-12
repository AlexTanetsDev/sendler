"use client";
import Image from "next/image";
import React, { ReactNode, useState } from "react";

function Swiper() {
	const [extra, setExtra] = useState<string>("");
	const [isActive, setIsActive] = useState(false);

	const hanleClick = (): void => {
		if (extra === "") {
			setExtra("swiperOnMove");
			setIsActive(true);
		} else {
			setExtra("");
			setIsActive(false);
		}
	};

	return (
		<>
			<div className="container relative mx-auto">
				<div className="flex gap-3  absolute right-[15px] top-[-50px]">
					<button
						type="button"
						className={` cursor-pointer ${!isActive && "opacity-[0.3]"} `}
						onClick={hanleClick}
						disabled={!isActive}
					>
						<Image
							src="/svg/carbon_next-outline.svg"
							alt="left arrow"
							width={28}
							height={28}
						/>
					</button>


					<button
						type="button"
						className={` cursor-pointer ${isActive && "opacity-[0.3]"} `}
						onClick={hanleClick}
						disabled={isActive}
					>
						<Image
							src="/svg/carbon_next-outline-1.svg"
							alt="right arrow"
							width={28}
							height={28}
						/>
					</button>
				</div>
			</div>

			<div className="container overflow-hidden mx-auto  ">
				<ul className={`flex gap-6 ${extra} swiperTransition`}>
					<SwiperCard idx="1">
						<Image
							src="/svg/swiper-check-circle.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							Зручний та простий у використанні інтерфейс керування послугою
						</p>
					</SwiperCard>

					<SwiperCard idx="2">
						<Image
							src="/svg/swiper-dollar.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							Ви сплачуєте лише за доставлені повідомлення за умови підписання
							договору!
						</p>
					</SwiperCard>

					<SwiperCard idx="3">
						<Image
							src="/svg/swiper-sms.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							Високий рівень відкриття SMS-повідомлень - найефективніший
							інструмент реклами.
						</p>
					</SwiperCard>

					<SwiperCard idx="4">
						<Image
							src="/svg/swiper-telegramm.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							SMS-розсилки – майбутнє вашого бізнесу, його успіх та розвиток.
						</p>
					</SwiperCard>

					<SwiperCard idx="5">
						<Image
							src="/svg/swipertime-fast.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							BSender - &#34;Швидкий, простий та надійний SMS сервіс&#34;
						</p>
					</SwiperCard>

					<SwiperCard idx="6">
						<Image
							src="/svg/swiper-gift.svg"
							width={60}
							height={60}
							alt="Circle-check icon"
						/>
						<p className="swiperCardText">
							Sms привітання з днем ​​народження для постійних клієнтів
						</p>
					</SwiperCard>
				</ul>
			</div>
		</>
	);
}

function SwiperCard({ children, idx }: { children: ReactNode; idx: string }) {
	return (
		<li
			key={idx}
			className=" min-w-[306px] h-[275px] rounded-[18px] border-[#E2E2E2] border bg-[#d8d8d819] px-[30px] py-[26px] flex flex-col gap-[22px] items-center"
		>
			{children}
		</li>
	);
}

export default Swiper;
