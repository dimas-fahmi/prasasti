"use client";
import { isHotkey } from "is-hotkey";
import { useMemo } from "react";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import useRenderElement from "@/src/lib/editor/hooks/useRenderElement";
import { MECP } from "@/src/ui/components/mainEditor/MECP";
import onKeyDown from "@/src/lib/editor/handlers/onKeyDown";
import { useMECPStore } from "@/src/lib/stores/mainEditorCommandPanel";
import useRenderLeaf from "@/src/lib/editor/hooks/useRenderLeaf";

const initialValue: Descendant[] = [
  { type: "paragraph", align: "left", children: [{ text: "" }] },
];

const ArtifactPageIndex = (_p: { id: string }) => {
  // Pull states from MECP store
  const { openMecp } = useMECPStore();

  // Initialize Editor Instance
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // Render Element
  const renderElement = useRenderElement();
  const renderLeaf = useRenderLeaf();

  return (
    <div className="p-4 md:p-12">
      {/* Title */}
      <textarea
        rows={1}
        className="border-0 outline-0 resize-none text-4xl font-header font-bold scrollbar-none w-full field-sizing-content mb-2"
        placeholder="Untitled Artifact"
        autoFocus
        onKeyDown={(e) => {
          if (isHotkey("enter", e)) {
            e.preventDefault();
            ReactEditor.focus(editor);
          }
        }}
      />

      {/* Slate Editor */}
      <Slate editor={editor} initialValue={initialValue}>
        <Editable
          className="border-0 outline-0"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(e) => {
            onKeyDown(e, editor, { openMecp });
          }}
        />

        <MECP />
      </Slate>
    </div>
  );
};

export default ArtifactPageIndex;
