"use client";

import { useMECPStore } from "@/src/lib/stores/mainEditorCommandPanel";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/src/ui/shadcn/components/ui/command";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Type,
} from "lucide-react";
import { useEffect } from "react";
import { ReactEditor } from "slate-react";

/**
 *
 * MECP (Main Editor Command Panel)
 *
 * @returns JSX.Element
 */
const MECP = () => {
  // Pull States from MECP Store
  const { mecpOpen, setMecpOpen, closeMecp, editor } = useMECPStore();

  // Execute Close Helper everytime the modal is closed
  useEffect(() => {
    if (!mecpOpen) {
      // UX: Refocus to Editor
      if (editor) {
        ReactEditor.focus(editor);
      }
      closeMecp();
    }
  }, [mecpOpen, closeMecp, editor]);

  return (
    <CommandDialog open={mecpOpen} onOpenChange={setMecpOpen}>
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* SUGGESTION SECTION */}
          <CommandGroup heading="Suggestions">
            {/* Paragraph */}
            <CommandItem>
              <Type />
              <span>Paragraph</span>
            </CommandItem>

            {/* Heading 1 and 2 */}
            <CommandItem>
              <Heading1 />
              <span>Heading 1</span>
            </CommandItem>
            <CommandItem>
              <Heading2 />
              <span>Heading 2</span>
            </CommandItem>

            {/* Quote Block */}
            <CommandItem>
              <Quote />
              <span>Quote Block</span>
            </CommandItem>
          </CommandGroup>

          {/* Lists */}
          <CommandSeparator />
          <CommandGroup className="mt-1" heading="Lists">
            <CommandItem>
              <List />
              <span>Bulleted List</span>
            </CommandItem>

            <CommandItem>
              <ListOrdered />
              <span>Ordered List</span>
            </CommandItem>

            <CommandItem>
              <ListTodo />
              <span>Todo List</span>
            </CommandItem>
          </CommandGroup>

          {/* Headings */}
          <CommandSeparator />
          <CommandGroup className="mt-1" heading="Headings">
            <CommandItem>
              <Heading3 />
              <span>Heading 3</span>
            </CommandItem>
            <CommandItem>
              <Heading4 />
              <span>Heading 4</span>
            </CommandItem>
            <CommandItem>
              <Heading5 />
              <span>Heading 5</span>
            </CommandItem>
            <CommandItem>
              <Heading6 />
              <span>Heading 6</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

/**
 *
 * Alias for MECP
 *
 * @returns JSX.Element
 */
const MainEditorCommandPanel = MECP;

export { MECP, MainEditorCommandPanel };
