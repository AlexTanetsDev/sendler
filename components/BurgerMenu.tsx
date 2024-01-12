import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

const BurgerMenu = ({isOpen, onClick}: Props) => {
  return (
      <button onClick={onClick} className="burger-menu z-20">
        {!isOpen ? (
          <Image
          className="transition-colors  duration-300 ease-in-out group-hover:text-blue-500"
            src="svg/burger-menu.svg"
            width={46}
            height={44}
            alt="button burger menu"
          ></Image>
        ) : (
          <Image
          className="transition-colors duration-300 ease-in-out group-hover:text-blue-500"
            src="svg/cross-burger.svg"
            width={46}
            height={44}
            alt="button burger menu"
          ></Image>
        )}
      </button>
  );
};

export default BurgerMenu;
