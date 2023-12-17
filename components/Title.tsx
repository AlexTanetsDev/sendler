import React, { ReactNode } from "react";

interface ITitleProps {
  type: "h1" | "h2";
  children: ReactNode;
}

function Title({ type, children }: ITitleProps) {
  return type === "h1" ? (
    <h1 className="title">{children}</h1>
  ) : (
    <h2 className="title">{children}</h2>
  );
}

export default Title;
