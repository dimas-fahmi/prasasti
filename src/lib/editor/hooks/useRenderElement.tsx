import Paragraph from "@/src/ui/components/mainEditor/elements/Paragraph";
import { useCallback } from "react";
import { RenderElementProps } from "slate-react";
import { ElementProps, ParagraphElementType } from "../../types/slate-elements";

const useRenderElement = () => {
  return useCallback((props: RenderElementProps) => {
    const { element } = props;
    const type = element?.type;

    if (!type) {
      return <></>;
    }

    switch (type) {
      default:
        return <Paragraph {...(props as ElementProps<ParagraphElementType>)} />;
    }
  }, []);
};

export default useRenderElement;
