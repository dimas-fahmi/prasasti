"use client";
import { isHotkey } from "is-hotkey";
import { useEffect, useMemo } from "react";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";
import { createEditor, Descendant } from "slate";
import useRenderElement from "@/src/lib/editor/hooks/useRenderElement";
import { MECP } from "@/src/ui/components/mainEditor/MECP";
import onKeyDown from "@/src/lib/editor/handlers/onKeyDown";
import { useMECPStore } from "@/src/lib/stores/mainEditorCommandPanel";
import useRenderLeaf from "@/src/lib/editor/hooks/useRenderLeaf";
import MainEditorToolbar from "@/src/ui/components/mainEditor/Toolbar";
import { withInlines } from "@/src/lib/editor/instances";
import LID from "@/src/ui/components/mainEditor/LID";
import { useUpdateNote } from "@/src/db/idb/hooks/useUpdateNote";
import { queries } from "@/src/lib/queries";
import { useQueryClient } from "@tanstack/react-query";

const initialValue: Descendant[] = [
  { type: "paragraph", align: "left", children: [{ text: "" }] },
];

const ArtifactPageIndex = ({ id }: { id: string }) => {
  // Pull states from MECP store
  const { openMecp, openLid } = useMECPStore();

  // Initialize Editor Instance
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  );

  // Render Element
  const renderElement = useRenderElement();
  const renderLeaf = useRenderLeaf();

  // Update Last Opened Artifact
  const recentQuery = queries.notes.recents();
  const queryClient = useQueryClient();
  const { mutate: updateNote, isPending: _isUpdatingNote } = useUpdateNote({
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: recentQuery.queryKey,
      });
    },
  });

  // Update Last Opened
  useEffect(() => {
    updateNote({ key: id, changes: { lastOpenedAt: new Date() } });
  }, [id, updateNote]);

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
            // Main Handler
            onKeyDown(e, editor, { openMecp, openLid });
          }}
        />

        <MainEditorToolbar />

        {/* Main Editor Command Pannel */}
        <MECP />

        {/* Link Injector Dialog */}
        <LID />
      </Slate>
    </div>
  );
};

export default ArtifactPageIndex;
