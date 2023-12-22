import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BSender",
  description: "BSender sms sending application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full pt-[50px] pb-20 flex flex-col items-center">{children}</main>;
}
