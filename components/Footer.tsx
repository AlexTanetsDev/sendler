
import Link from "next/link";
import React from "react";
import Feedback from "./Feedback";
import LogoFooter from "./LogoFooter";

const Footer = () => {
	return (
		<footer
			id="footer"
			className=" w-full flex justify-center bg-bgFooter pt-[50px] pb-[38px] text-white font-roboto text-lg font-normal"
		>
			<div className="container ">
				<LogoFooter />
				<ul className="flex flex-wrap lg:flex-wrap-no-wrap justify-between items-center pt-[60px]">
					<li className="flex flex-col gap-[14px] justify-center mb-[50px] lg:mb-0">
						<p className=" lg:text-base text-sm font-medium ">
							Компанія ТОВ &quot;Інноваційні медіа рішення&quot;
						</p>
						<p className="lg:text-base text-sm font-medium">
							Пошта
							<Link
								className="ml-3 lg:text-base text-sm underline-offset-1 underline"
								href="mailto:info@bsender.com.ua"
								type="email"
							>
								info@bsender.com.ua
							</Link>
						</p>
						<p className="lg:text-base text-sm font-medium">
							Телефон
							<Link className="ml-3 lg:text-base text-sm" href="tel:+38 (097) 678-12-59">
								+38 (097) 678-12-59
							</Link>
						</p>
					</li>
					<li className="flex flex-col gap-[14px] justify-center mb-[50px] lg:mb-0">
						<p className="lg:text-base text-sm  font-medium ">Юридична адреса</p>
						<p className="lg:text-base text-sm">
							01033, Україна, м. Київ, вул. Гайдара, 50
						</p>
						<p className="lg:text-base text-sm">
							Мобільний маркетинг, Масові SMS розсилки
						</p>
					</li>
					<li className="flex flex-col gap-[14px] justify-center">
						<Feedback />
					</li>
					<li className="block lg:hidden">
						<p className="text-center text-sm mt-[60px]">
							&copy; {new Date().getFullYear()}, BSender.com.ua Всі права захищені
						</p>
					</li>
				</ul>

				<p className="hidden lg:block  text-center text-sm mt-[60px]">
					&copy; {new Date().getFullYear()}, BSender.com.ua Всі права захищені
				</p>
			</div>
		</footer>
	);
};

export default Footer;