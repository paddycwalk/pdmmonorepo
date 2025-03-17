"use client";
import "./ContextMenu.scss";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
// import { useKeyPressEvent } from 'react-use';
// import useClickAway from 'react-use/lib/useClickAway';

export interface ContextMenuProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  visible?: boolean;
  close?: () => void;
  trigger?:
    | React.RefObject<HTMLButtonElement>
    | React.RefObject<HTMLSpanElement>;
  className?: string;
}

function getContextMenuLeft(
  trigger:
    | React.RefObject<HTMLButtonElement>
    | React.RefObject<HTMLSpanElement>,
  contextMenuEl: React.RefObject<HTMLDivElement | null>,
): number {
  if (trigger.current?.parentElement && contextMenuEl?.current) {
    if (
      trigger.current.getBoundingClientRect().x +
        contextMenuEl.current.offsetWidth <
      document.documentElement.clientWidth
    ) {
      return trigger.current.offsetLeft;
    } else {
      return (
        trigger.current.offsetLeft -
        contextMenuEl.current.offsetWidth +
        trigger.current.offsetWidth
      );
    }
  }
  return 0;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  style,
  visible,
  trigger: triggerEl,
  close,
  className,
}: ContextMenuProps): React.ReactElement => {
  // useKeyPressEvent('Escape', close);
  const contextMenuEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close?.();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuEl.current &&
        !contextMenuEl.current.contains(event.target as Node)
      ) {
        close?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  const [position, setPosition] = useState<{
    left: number;
    top: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (!triggerEl?.current || !contextMenuEl.current) {
      return;
    }

    if (!visible) {
      return;
    }

    const contextMenuTop =
      triggerEl.current.offsetTop + triggerEl.current.offsetHeight;
    const contextMenuLeft = getContextMenuLeft(triggerEl, contextMenuEl);

    setPosition({ left: contextMenuLeft, top: contextMenuTop });
  }, [visible, setPosition]);

  return (
    <div
      className={`ContextMenu ${visible ? "ContextMenu-visible" : ""} ${className ? className : ""}`}
      style={{ ...style, ...position }}
      ref={contextMenuEl}
    >
      {children}
    </div>
  );
};
