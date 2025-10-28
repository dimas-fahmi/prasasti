import { MainEditor } from "../../types/slate";
import { RegisteredElement } from "../../types/slate-elements";
import { Editor } from "slate";

const isElementDefault = (editor: MainEditor, element: RegisteredElement) => {
  const isEmpty = Editor.isEmpty(editor, element);
  const isParagraph = element?.type === "paragraph";

  return isEmpty && isParagraph;
};

export default isElementDefault;
