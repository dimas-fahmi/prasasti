import React from "react";
import NextLink from "next/link";
import { ElementProps, LinkElementType } from "@/src/lib/types/slate-elements";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/shadcn/components/ui/tooltip";
import { Node } from "slate";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { ExternalLink, Pencil } from "lucide-react";
import { useMECPStore } from "@/src/lib/stores/mainEditorCommandPanel";

const Link = (props: ElementProps<LinkElementType>) => {
  const { attributes, children, element } = props;
  const { openLid } = useMECPStore();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NextLink
          {...attributes}
          href={element.href}
          target={element?.blank ? "_blank" : ""}
          className="text-link hover:underline"
        >
          {children}
        </NextLink>
      </TooltipTrigger>
      <TooltipContent className="min-w-32">
        <div className="mb-2">
          <h1 className="font-header font-bold">Text</h1>
          <p>{Node.string(element)}</p>
        </div>

        <div className="mb-2">
          <h1 className="font-header font-bold">URI</h1>
          <p>{element.href}</p>
        </div>

        <div className="mb-4">
          <h1 className="font-header font-bold">New Tab</h1>
          <p>{element.blank ? "Yes" : "No"}</p>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-2 gap-1">
          <Button size={"sm"} asChild>
            <NextLink
              href={element.href}
              target={element.blank ? "_blank" : ""}
            >
              <ExternalLink className="w-4 h-4" />
            </NextLink>
          </Button>
          <Button
            size={"sm"}
            onClick={() => {
              openLid(element);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default Link;
