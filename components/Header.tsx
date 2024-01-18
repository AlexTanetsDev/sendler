'use client'
import { usePathname } from "next/navigation";
import Nav from "./Nav";
const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAuth = pathname === '/login' || pathname ==='/signup'
 
  return (
    <header className={`w-full text-white font-montserrat py-5 lg:py-6 h-[89px] lg:h-auto ${isHomePage ? 'bg-transparent absolute' : `${isAuth ? 'bg-hederTransparent absolute' : 'bg-bgFooter relative'} `}`}>
      <Nav />
    </header>
  );
};

export default Header;
