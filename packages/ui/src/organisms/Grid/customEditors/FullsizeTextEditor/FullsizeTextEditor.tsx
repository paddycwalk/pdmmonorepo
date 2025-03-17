"use client";
import "./FullsizeTextEditor.scss";
import { Modal } from "../../../Modal/Modal";
import { RichText } from "../../../RichText/RichText";
import { Panel } from "../../../../molecules/Panel/Panel";

export interface FullsizeTextEditorProps {
  isModalOpen: boolean;
  setModalOpen?: (isOpen: boolean) => void;
  closeLabel: string;
  value: string;
  onChange: (newValue: string) => void;
}

export const FullsizeTextEditor = ({
  isModalOpen,
  setModalOpen,
  closeLabel,
  value,
  onChange,
}: FullsizeTextEditorProps) => {
  return (
    <Modal
      className="FullsizeTextEditor"
      title="FullsizeTextEditor"
      isOpen={isModalOpen}
      onClose={() => setModalOpen && setModalOpen(false)}
      closeLabel={closeLabel}
    >
      <Panel>
        <RichText onChange={onChange} placeholder="" value={value}></RichText>
      </Panel>
    </Modal>
  );
};
