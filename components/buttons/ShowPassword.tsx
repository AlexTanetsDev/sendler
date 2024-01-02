import Image from "next/image";
import React from "react";

type Props = {
  show: boolean;
  onClick: () => void;
};

const ShowPassword = ({ show, onClick }: Props) => {
  return (
    <button className="absolute top-1 right-3 " type="button" onClick={onClick}>
      <Image
        src={show ? "svg/showPasword.svg" : "svg/hide-password.svg"}
        width={32}
        height={32}
        alt="button show password"
      ></Image>
    </button>
  );
};

export default ShowPassword;
