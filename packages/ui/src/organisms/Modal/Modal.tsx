"use client";

import "./Modal.scss";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import { Button } from "../../atoms/Button/Button";
import {
  CloseIcon,
  CornArrowIcon,
  StretchIcon,
  Headline,
  LoadingSpinner,
} from "../../..";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeLabel: string;
  children: React.ReactNode;
  title?: string;
  className?: string;
  onApply?: () => void;
  onApplyLabel?: string;
  isLoading?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  closeLabel,
  children,
  title,
  className,
  onApply,
  onApplyLabel,
  isLoading = false,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isFullsize, setIsFullsize] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const toggleFullSize = () => {
    setIsFullsize((prev) => !prev);
  };

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-label="Modal"
      aria-modal="true"
      className={clsx(
        "Modal",
        { "Modal-open": isOpen, "Modal-fullsize": isFullsize },
        className,
      )}
      onClick={handleClickOutside}
    >
      <div ref={modalRef} className="Modal_content">
        <div className="Modal_header">
          {title && (
            <Headline size="large" bold>
              {title}
            </Headline>
          )}
          <div className="Modal_btns">
            <Button
              onClick={toggleFullSize}
              aria-label="Fullsize"
              icon={isFullsize ? <StretchIcon /> : <CornArrowIcon />}
            ></Button>
            <Button
              onClick={onClose}
              aria-label="Close modal"
              icon={<CloseIcon />}
            ></Button>
          </div>
        </div>
        {children}
        <div className="Modal_footer">
          <Button ariaLabel="Close modal" outline onClick={onClose}>
            {closeLabel}
          </Button>
          {onApply && (
            <Button ariaLabel="Save modal" onClick={onApply} theme={"primary"}>
              {isLoading ? (
                <LoadingSpinner size="tiny" />
              ) : (
                (onApplyLabel ?? "##Apply")
              )}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};
