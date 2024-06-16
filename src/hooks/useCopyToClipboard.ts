import { useEffect, useState } from "react";

export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);
  const copyToClipboard = (value: string) => {
    navigator.clipboard
      .writeText(value)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error("Failed to copy value to clipboard:", error);
      });
  };
  return { copied, copyToClipboard };
};
