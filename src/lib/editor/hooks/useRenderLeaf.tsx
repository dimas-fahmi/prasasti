import { cn } from "@/src/ui/shadcn/lib/utils";
import { useCallback } from "react";
import { RenderLeafProps } from "slate-react";

const useRenderLeaf = () => {
  return useCallback((props: RenderLeafProps) => {
    const { attributes, children, leaf } = props;

    return (
      <span
        {...attributes}
        className={cn(
          leaf?.bold && "font-bold",
          leaf?.italic && "italic",
          leaf?.underline && "underline",
          leaf?.strikeThrough && "line-through",
          leaf?.className
        )}
      >
        {children}
      </span>
    );
  }, []);
};

export default useRenderLeaf;
