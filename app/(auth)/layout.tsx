
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
        <div className="h-screen w-full bg-cover bg-center bg-[url('/bg-auth.png')] flex items-left justify-left py-20">
			<div className=" container mx-auto flex items-start"> {children}</div>
       		
        </div>
					
	);
}
