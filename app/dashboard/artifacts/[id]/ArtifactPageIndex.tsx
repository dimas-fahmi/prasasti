"use client";
import { isHotkey } from "is-hotkey";
import { useMemo } from "react";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import useRenderElement from "@/src/lib/editor/hooks/useRenderElement";

const initialValue: Descendant[] = [
  { type: "paragraph", align: "left", children: [{ text: "" }] },
];

const ArtifactPageIndex = (_p: { id: string }) => {
  // Initialize Editor Instance
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // Render Element
  const renderElement = useRenderElement();

  return (
    <div className="p-4 md:p-12">
      {/* Title */}
      <textarea
        rows={1}
        className="border-0 outline-0 resize-none text-4xl font-header font-bold scrollbar-none w-full field-sizing-content mb-2"
        placeholder="Untitled Artifact"
        onKeyDown={(e) => {
          if (isHotkey("enter", e)) {
            e.preventDefault();
          }
        }}
      />

      {/* Slate Editor */}
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          className="border-0 outline-0"
          renderElement={renderElement}
        />
      </Slate>
    </div>
  );
};

export default ArtifactPageIndex;
