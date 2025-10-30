"use client";
import { isHotkey } from "is-hotkey";
import { useEffect, useMemo, useState } from "react";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Note } from "@/src/db/idb/schema/note";

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

  // Query Note
  const noteQuery = queries.notes.note(id);
  const { data: note, refetch } = useQuery({
    ...noteQuery,
  });

  // Title State
  const [title, setTitle] = useState("");

  // Is Typing State
  const [isTyping, setIsTyping] = useState(false);

  // Mutation
  const { mutate: updateNote, isPending: _isUpdatingNote } = useUpdateNote({
    onSettled: () => {
      refetch();
      queryClient.invalidateQueries({
        queryKey: recentQuery.queryKey,
      });
    },
  });

  useEffect(() => {
    if (isTyping) {
      const debouncer = setTimeout(() => {
        setIsTyping(false);

        const note: Partial<Note> = {
          title,
          content: JSON.stringify(editor.children),
        };

        updateNote({ key: id, changes: note });
      }, 500);

      return () => clearTimeout(debouncer);
    }
  }, [isTyping, setIsTyping, title, id, updateNote, editor]);

  // Update Last Opened
  useEffect(() => {
    updateNote({ key: id, changes: { lastOpenedAt: new Date() } });
  }, [id, updateNote]);

  useEffect(() => {
    if (note) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(note?.title || "");
    }
  }, [note]);

  return (
    <div className="p-4 md:p-12" suppressHydrationWarning>
      {/* Title */}
      <textarea
        rows={1}
        className="border-0 outline-0 resize-none text-4xl font-header font-bold scrollbar-none w-full field-sizing-content mb-2"
        placeholder="Untitled Artifact"
        autoFocus
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onKeyDown={(e) => {
          setIsTyping(true);
          if (isHotkey("enter", e)) {
            e.preventDefault();
            ReactEditor.focus(editor);
          }
        }}
      />

      {/* Slate Editor */}
      <Slate
        editor={editor}
        initialValue={
          note?.content ? JSON.parse(note?.content || "") : initialValue
        }
      >
        <Editable
          className="border-0 outline-0"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(e) => {
            setIsTyping(true);
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
