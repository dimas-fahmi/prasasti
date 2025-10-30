import { Element, Node } from "slate";

export const validateChildren = (value: unknown): boolean => {
  if (!value) {
    return false;
  }

  if (!Array.isArray(value)) {
    return false;
  }

  if (!Node.isNodeList(value)) {
    return false;
  }

  const areAllAlement = value.every(() => Element.isElement);

  if (!areAllAlement) {
    return false;
  }

  if (!value.length) {
    return false;
  }

  return areAllAlement;
};
