"use client";

import { KeyboardEvent } from "react";
import { MainEditor } from "../../types/slate";
import { getCurrentBlock } from "../utils/getElement";
import { RegisteredElement } from "../../types/slate-elements";
import { MainEditorCommandPanelStore } from "../../stores/mainEditorCommandPanel";
import { marksHandler, mecpHandler } from "./onKeyDownListeners";

const onKeyDown = (
  e: KeyboardEvent<HTMLDivElement>,
  editor: MainEditor,
  {
    openMecp,
    openLid,
  }: {
    openMecp: MainEditorCommandPanelStore["openMecp"];
    openLid: MainEditorCommandPanelStore["openLid"];
  }
) => {
  // Get Current Closest Block
  const [cbe] = getCurrentBlock(editor) || [];
  const currentBlockElement = cbe as RegisteredElement | undefined;

  // MECP Handler
  mecpHandler(e, editor, openMecp, openLid, currentBlockElement);

  // Mark Toggle Handler
  marksHandler(e, editor);
};

export default onKeyDown;
