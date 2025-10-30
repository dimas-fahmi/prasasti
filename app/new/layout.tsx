import React from "react";

const NewPrasastiLayout = ({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) => {
  return <div className="min-h-screen md:flex-center">{children}</div>;
};

export default NewPrasastiLayout;
