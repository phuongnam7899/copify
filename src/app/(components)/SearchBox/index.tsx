import { useEffect, useRef } from "react";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

export const SearchBox = ({ value, onChange }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = () => {
      if (ref.current && document.activeElement !== ref.current) {
        ref.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <input
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 w-1/3 min-w-80 border border-blue-700 rounded-sm mb-8 px-1"
    />
  );
};
