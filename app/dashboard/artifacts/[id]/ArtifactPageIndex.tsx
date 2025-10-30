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
import { validateChildren } from "@/src/lib/editor/utils/validateChildren";
import ArtifactPageIndexSkeleton from "./ArtifactPageIndexSkeleton";
import { Note } from "@/src/db/idb/schema/note";
import { DEFAULT_INITIAL } from "@/src/db/idb/actions/generateNote";

const SAVE_TIMEOUT = 500; // 0.5s wait after user stop typing, then save.

const ArtifactPageIndex = ({ id }: { id: string }) => {
  // Pull command panel states from the store
  const { openMecp, openLid } = useMECPStore();

  // Initialize Slate editor with plugins for inlines, history, and React integration
  const editor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  );

  // Custom hooks for rendering Slate elements and leaves
  const renderElement = useRenderElement();
  const renderLeaf = useRenderLeaf();

  // Query client for invalidating recent notes query after updates
  const queryClient = useQueryClient();
  const recentQuery = queries.notes.recents();

  // Fetch the specific note using Tanstack Query
  const noteQuery = queries.notes.note(id);
  const {
    data: note,
    refetch,
    isLoading,
  } = useQuery({
    ...noteQuery,
  });

  // State for the note title
  const [title, setTitle] = useState("");

  // Mutation hook for updating the note in the database
  const { mutate: updateNote } = useUpdateNote({
    onSettled: () => {
      refetch();
      queryClient.invalidateQueries({
        queryKey: recentQuery.queryKey,
      });
    },
  });

  // Debounce Mechanism
  const [isTyping, setIsTyping] = useState(0);

  useEffect(() => {
    if (isTyping) {
      const debouncer = setTimeout(() => {
        setIsTyping(0);
        const changes: Partial<Note> = {
          title,
          content: JSON.stringify(editor.children),
        };
        updateNote({ key: id, changes });
      }, SAVE_TIMEOUT);

      return () => clearTimeout(debouncer);
    }
  }, [isTyping, setIsTyping, updateNote, editor, id, title]);

  // Effect to update the last opened timestamp on component mount
  useEffect(() => {
    updateNote({ key: id, changes: { lastOpenedAt: new Date() } });
  }, [id, updateNote]);

  // Compute initial editor value from note content or default
  const initialValue: Descendant[] = useMemo(() => {
    if (note?.content) {
      const parsed = JSON.parse(note.content);
      const isValid = validateChildren(parsed);
      return isValid ? parsed : DEFAULT_INITIAL;
    }
    return DEFAULT_INITIAL;
  }, [note]);

  // Effect to set initial title from fetched note
  useEffect(() => {
    if (note) {
      // DUNNO WHY TF ESLINT KEEP WHINING
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(note?.title || "");
    }
  }, [note]);

  // Handle loading state while fetching note
  if (isLoading || !note) {
    return <ArtifactPageIndexSkeleton />; // Show loading indicator until note is available
  }

  return (
    <div className="p-4 md:p-12">
      {/* Title input as a resizable textarea */}
      <textarea
        rows={1}
        className="border-0 outline-0 resize-none text-4xl font-header font-bold scrollbar-none w-full field-sizing-content mb-2"
        placeholder="Untitled Artifact"
        autoFocus
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setIsTyping(isTyping + 1);
        }}
        onKeyDown={(e) => {
          if (isHotkey("enter", e)) {
            e.preventDefault();
            ReactEditor.focus(editor);
          }
        }}
      />

      {/* Slate rich text editor */}
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={() => {
          setIsTyping(isTyping + 1);
        }}
      >
        <Editable
          className="border-0 outline-0"
          renderElement={renderElement} // Custom element rendering
          renderLeaf={renderLeaf} // Custom leaf rendering
          onKeyDown={(e) => {
            // Handle key down events for editor commands
            onKeyDown(e, editor, { openMecp, openLid });
          }}
        />

        {/* Editor toolbar component */}
        <MainEditorToolbar />

        {/* Main Editor Command Panel */}
        <MECP />

        {/* Link Injector Dialog */}
        <LID />
      </Slate>
    </div>
  );
};

export default ArtifactPageIndex;
