import React, { useEffect, useRef, useState } from "react";

export default function useLineLimit(content: string) {
  const [contentExceedsLimit, setContentExceedsLimit] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkContentHeight = () => {
      if (contentRef.current) {
        const lineHeight = parseInt(
          window.getComputedStyle(contentRef.current).lineHeight,
        );
        const contentHeight = contentRef.current.scrollHeight;
        const fourLinesHeight = lineHeight * 4;

        setContentExceedsLimit(contentHeight > fourLinesHeight);
      }
    };

    checkContentHeight();
    window.addEventListener("resize", checkContentHeight);

    return () => {
      window.removeEventListener("resize", checkContentHeight);
    };
  }, [content]);

  return { contentExceedsLimit, contentRef };
}
