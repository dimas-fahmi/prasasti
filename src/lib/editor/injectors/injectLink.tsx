import { Editor, Path, Range, Transforms } from "slate";
import { MainEditor } from "../../types/slate";
import { LinkElementType } from "../../types/slate-elements";
import { NodeInsertNodesOptions } from "slate/dist/interfaces/transforms/node";
import { ReactEditor } from "slate-react";

export const injectLink = (
  editor: MainEditor,
  element: LinkElementType,
  options?: NodeInsertNodesOptions<LinkElementType>
) => {
  // Get Selection
  const selection = editor?.selection;

  // Throw Error if editor.selection is fallsy
  if (!selection) throw new Error("Cannot insert link without a selection.");

  const isCollapsed = Range.isCollapsed(selection);

  // Precompute where is insertion point and it's sibling position should be
  const { anchor } = selection;
  const nextPath = Path.next(anchor.path);
  const siblingPath = Path.next(nextPath);

  // Check whether this is the end of a block or not
  const next = Editor.next(editor);

  // Insert Link

  Transforms.insertNodes(editor, element, {
    select: true,
    at: isCollapsed ? anchor : undefined,
    ...options,
  });

  // Add regular text space if it's the end of the block
  if (!next) {
    Transforms.insertNodes(
      editor,
      { text: " " },
      { at: siblingPath, select: true }
    );
  }

  // Always refocus editor
  ReactEditor.focus(editor);
};
