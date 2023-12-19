'use client'
import { usePathname } from "next/navigation";
import Nav from "./Nav";
const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  return (
    <header className={`w-full text-white font-montserrat py-6 ${isHomePage ? 'bg-transparent absolute' :'bg-bgFooter relative'} `}>
      <Nav />
    </header>
  );
};

export default Header;
