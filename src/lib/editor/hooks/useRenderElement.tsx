import Paragraph from "@/src/ui/components/mainEditor/elements/Paragraph";
import { useCallback } from "react";
import { RenderElementProps } from "slate-react";
import {
  ElementProps,
  LinkElementType,
  ParagraphElementType,
} from "../../types/slate-elements";
import Link from "@/src/ui/components/mainEditor/elements/Link";

const useRenderElement = () => {
  return useCallback((props: RenderElementProps) => {
    const { element } = props;
    const type = element?.type;

    if (!type) {
      return <></>;
    }

    switch (type) {
      case "link":
        return <Link {...(props as ElementProps<LinkElementType>)} />;
      default:
        return <Paragraph {...(props as ElementProps<ParagraphElementType>)} />;
    }
  }, []);
};

export default useRenderElement;
