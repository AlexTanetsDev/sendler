'use client'
import { usePathname } from "next/navigation";
import Nav from "./Nav";
const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAuth = pathname === '/login' || pathname ==='/signup'
 
  return (
    <header className={`w-full text-white font-montserrat py-6 ${isHomePage ? 'bg-transparent absolute' : `${isAuth ? 'bg-hederTransparent' : 'bg-bgFooter '} relative`}`}>
      <Nav />
    </header>
  );
};

export default Header;
