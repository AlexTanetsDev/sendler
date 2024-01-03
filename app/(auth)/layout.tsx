import TitleAuthForm from "@/components/TitleAuthForm";
import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Authorization",
//   description: "BSender sms sending application",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <div className="w-full h-[1162px] overflow-y-auto  bg-cover bg-center bg-[url('/bg-auth.png')] flex items-left justify-left pt-[190px] mb-20">
      <div className=" container mx-auto flex items-start">
        <div className=" w-[526px] py-11  flex justify-items-center  items-center flex-col leading-6 rounded-[18px] border-gray-700 px-[26px] bg-formBg">
          <h1 className="form-title mb-8">Особистий кабінет</h1>
          <TitleAuthForm/>
          <>{children}</>
        </div>
      </div>
    </div>
  );
}
