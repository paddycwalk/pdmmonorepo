"use client";

import "./RichText.scss";
import {
  BtnRedo,
  BtnUndo,
  createButton,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";
import { EraserIcon } from "../../..";

export interface RichTextProps {
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
}

export const RichText = ({ placeholder, value, onChange }: RichTextProps) => {
  const BtnClear = createButton("Clear value", <EraserIcon />, () => {
    onChange("");
  });

  return (
    <EditorProvider>
      <Editor
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="RichText"
        placeholder={placeholder}
      >
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <BtnClear />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
};
