'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import LogOutButton from './buttons/LogOutButton';
import { privateNavigation, publicNavigation } from '@/data/data';
import LoginButton from './buttons/LoginButon';
import LogoNav from './LogoNav';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ModalBurgerMenu from './Modal/ModalBurgerMenu';

const Nav = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname();
  const userId = session?.user.user_id;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    if (isModalOpen) {
      setIsOpen(true);
      setIsModalOpen(false);
      document.body.classList.remove('overflow-hidden');
    } else {
      setIsOpen(false);
      setIsModalOpen(true);
      document.body.classList.add('overflow-hidden');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsOpen(!isOpen);
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
      <nav className={`flex  justify-between lg:items-center container mx-auto relative z-10`}>
        {isOpen && (
          <div className="z-20 h-[49px] lg:h-[51px]">
            <LogoNav />
          </div>
        )}
        {isOpen && (
          <button onClick={toggleModal} className="burger-menu z-20">
            <svg
              width="46"
              height="44"
              viewBox="0 0 46 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M37.8548 21.9997C37.8548 21.635 37.7034 21.2853 37.4338 21.0274C37.1642 20.7695 36.7986 20.6247 36.4173 20.6247H9.58398C9.20274 20.6247 8.8371 20.7695 8.56752 21.0274C8.29793 21.2853 8.14648 21.635 8.14648 21.9997C8.14648 22.3643 8.29793 22.7141 8.56752 22.9719C8.8371 23.2298 9.20274 23.3747 9.58398 23.3747H36.4173C36.7986 23.3747 37.1642 23.2298 37.4338 22.9719C37.7034 22.7141 37.8548 22.3643 37.8548 21.9997ZM37.8548 12.833C37.8548 12.4683 37.7034 12.1186 37.4338 11.8607C37.1642 11.6029 36.7986 11.458 36.4173 11.458H9.58398C9.20274 11.458 8.8371 11.6029 8.56752 11.8607C8.29793 12.1186 8.14648 12.4683 8.14648 12.833C8.14648 13.1977 8.29793 13.5474 8.56752 13.8053C8.8371 14.0631 9.20274 14.208 9.58398 14.208H36.4173C36.7986 14.208 37.1642 14.0631 37.4338 13.8053C37.7034 13.5474 37.8548 13.1977 37.8548 12.833ZM37.8548 31.1663C37.8548 30.8017 37.7034 30.4519 37.4338 30.1941C37.1642 29.9362 36.7986 29.7913 36.4173 29.7913H9.58398C9.20274 29.7913 8.8371 29.9362 8.56752 30.1941C8.29793 30.4519 8.14648 30.8017 8.14648 31.1663C8.14648 31.531 8.29793 31.8808 8.56752 32.1386C8.8371 32.3965 9.20274 32.5413 9.58398 32.5413H36.4173C36.7986 32.5413 37.1642 32.3965 37.4338 32.1386C37.7034 31.8808 37.8548 31.531 37.8548 31.1663Z"
                fill="white"
              />
            </svg>
          </button>
        )}
        <ul
          className={` hidden lg:py-0 lg:h-auto bg-bgFooter lg:flex lg:justify-center lg:items-center lg:gap-10 lg:static lg:bg-transparent lg:w-auto text-center lg:text-lg text-[22px] font-medium lg:font-normal leading-[33px] lg:leading-6 pt-[189px] pl-[84px] lg:pt-0 Lg:pl-0`}
        >
          {status === 'authenticated'
            ? privateNavigation.map(({ id, title, path }) => (
                <li key={id} className="mb-10 lg:mb-0">
                  <Link
                    href={`/user/${userId}/${path}`}
                    className="hover:underline hover:underline-offset-4 py-4 transition-all"
                  >
                    {title}
                  </Link>
                </li>
              ))
            : publicNavigation.map(({ id, title, path }) => (
                <li className="mb-10 lg:mb-0" key={id}>
                  <Link
                    href={path}
                    className={`hover:underline hover:underline-offset-4 py-4 transition-all ${
                      pathName === path ? 'underline underline-offset-4' : 'no-underline'
                    }`}
                  >
                    {title}
                  </Link>
                </li>
              ))}
          {status === 'authenticated' ? <LogOutButton /> : <LoginButton />}
        </ul>
      </nav>

      <ModalBurgerMenu isOpen={isModalOpen} onClose={closeModal}>
        <ul
          className={`absolute top-0 left-0 z-10 py-5 pl-[84px] min-h-screen block w-[436px] bg-bgFooter text-2xl text-white burger-menu-overlay duration-500 transition-all `}
        >
          <div className=" mb-[120px] h-[49px]  ml-[-64px]">
            <LogoNav onClose={closeModal} />
          </div>
          {status === 'authenticated'
            ? privateNavigation.map(({ id, title, path }) => (
                <li key={id} className="mb-10 lg:mb-0">
                  <Link
                    onClick={toggleModal}
                    href={`/user/${userId}/${path}`}
                    className="hover:underline hover:underline-offset-4 py-4 transition-all"
                  >
                    {title}
                  </Link>
                </li>
              ))
            : publicNavigation.map(({ id, title, path }) => (
                <li className="mb-10 lg:mb-0" key={id}>
                  <Link
                    onClick={toggleModal}
                    href={path}
                    className={`hover:underline hover:underline-offset-4 py-4 transition-all ${
                      pathName === path ? 'underline underline-offset-4' : 'no-underline'
                    }`}
                  >
                    {title}
                  </Link>
                </li>
              ))}
          {status === 'authenticated' ? (
            <LogOutButton onClick={toggleModal} />
          ) : (
            <LoginButton onClick={toggleModal} />
          )}
        </ul>
        {!isOpen && (
          <button
            onClick={closeModal}
            className="burger-menu z-20 absolute right-[20px] top-[24px]"
          >
            <svg
              width="45"
              height="45"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M22.4998 39.6428C31.9675 39.6428 39.6426 31.9677 39.6426 22.5C39.6426 13.0322 31.9675 5.35712 22.4998 5.35712C13.0321 5.35712 5.35693 13.0322 5.35693 22.5C5.35693 31.9677 13.0321 39.6428 22.4998 39.6428Z"
                stroke="#ffffff"
                strokeWidth="1.52381"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.0713 16.0714L28.9284 28.9286M28.9284 16.0714L16.0713 28.9286"
                stroke="#ffffff"
                strokeWidth="1.52381"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </ModalBurgerMenu>
    </>
  );
};

export default Nav;
