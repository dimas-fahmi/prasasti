import { KeyboardEvent } from "react";
import { MainEditor } from "../../types/slate";
import { getCurrentBlock } from "../utils/getElement";
import { RegisteredElement } from "../../types/slate-elements";
import isElementDefault from "../utils/isElementDefault";
import { MainEditorCommandPanelStore } from "../../stores/mainEditorCommandPanel";

const onKeyDown = (
  e: KeyboardEvent<HTMLDivElement>,
  editor: MainEditor,
  { openMecp }: { openMecp: MainEditorCommandPanelStore["openMecp"] }
) => {
  // Get Current Closest Block
  const [cbe] = getCurrentBlock(editor) || [];
  const currentBlockElement = cbe as RegisteredElement | undefined;
  if (!currentBlockElement) return;

  // Check if CBE is a default element at its default state
  const isCBEDefault = isElementDefault(editor, currentBlockElement);

  // Open MECP if CBE default and user hit '/'
  if (e.key === "/" && isCBEDefault) {
    e.preventDefault();
    openMecp(editor);
  }
};

export default onKeyDown;
