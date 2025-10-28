import {
  EditorParentOptions,
  Editor as SlateEditor,
  Element as SlateElement,
} from "slate";
import { MainEditor } from "../../types/slate";

export const getCurrentLeaf = (editor: MainEditor) => {
  const selection = editor.selection;
  if (!selection) return undefined;
  const match = SlateEditor.node(editor, selection);
  return match;
};

export const getCurrentBlock = (editor: MainEditor) => {
  const selection = editor.selection;
  if (!selection) return undefined;

  const [match] = SlateEditor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && SlateEditor.isBlock(editor, n),
  });

  return match;
};

export const getParent = (
  editor: MainEditor,
  options?: EditorParentOptions
) => {
  const selection = editor.selection;
  if (!selection) return undefined;

  const parentEntry = SlateEditor.parent(editor, selection, {
    ...options,
  });

  return parentEntry;
};
