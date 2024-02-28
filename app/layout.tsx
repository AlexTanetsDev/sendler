import "./globals.css";
import type { Metadata } from "next";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "@/components/providers/Providers";
import ToastProvider from "@/components/providers/TostifyProvider";
import BackToTopBtn from "@/components/buttons/BackToTopBtn";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
	title: "BSender",
	description: "BSender sms sending application",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<html lang="en">
			<body className="flex flex-col items-center min-h-screen">
				<Providers>
					<Toaster />
					<ToastProvider>
						<Header />
						{children}
						<Footer />
						<BackToTopBtn />
					</ToastProvider>
				</Providers>
			</body>
		</html>
	);
};
