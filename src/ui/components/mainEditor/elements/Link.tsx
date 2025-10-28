import React from "react";
import NextLink from "next/link";
import { ElementProps, LinkElementType } from "@/src/lib/types/slate-elements";

const Link = (props: ElementProps<LinkElementType>) => {
  const { attributes, children, element } = props;

  return (
    <NextLink
      {...attributes}
      href={element.href}
      target={element?.blank ? "_blank" : ""}
    >
      {children}
    </NextLink>
  );
};

export default Link;
