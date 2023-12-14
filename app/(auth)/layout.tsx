
import type { Metadata } from "next";



export const metadata: Metadata = {
	title: "Authorization",
	description: "BSender sms sending application",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (	
        <div className="h-screen  container bg-cover bg-center bg-[url('/bg-auth.png')] flex items-left justify-left">
        {children}		
        </div>
					
	);
}
