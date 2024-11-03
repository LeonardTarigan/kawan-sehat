"use client";

import * as React from "react";
import autosize from "autosize";
import { Textarea } from "./textarea";

interface AutoExpandingTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  initialRows?: number;
  maxRows?: number;
}

export default function AutoExpandingTextarea({
  initialRows = 1,
  maxRows,
  className,
  ...props
}: AutoExpandingTextareaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }

    return () => {
      if (textareaRef.current) {
        autosize.destroy(textareaRef.current);
      }
    };
  }, []);

  const handleInput = React.useCallback(() => {
    if (textareaRef.current && maxRows) {
      const lineHeight = parseInt(
        getComputedStyle(textareaRef.current).lineHeight,
      );
      const maxHeight = lineHeight * maxRows;
      textareaRef.current.style.maxHeight = `${maxHeight}px`;
      textareaRef.current.style.overflowY =
        textareaRef.current.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [maxRows]);

  React.useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener("input", handleInput);
    }
    return () => {
      if (textarea) {
        textarea.removeEventListener("input", handleInput);
      }
    };
  }, [handleInput]);

  return (
    <Textarea
      ref={textareaRef}
      rows={initialRows}
      className={`min-h-[${initialRows * 1.5}rem] resize-none ${className || ""}`}
      onInput={handleInput}
      {...props}
    />
  );
}
