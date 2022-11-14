import { useEffect, useRef } from "react";

interface SuggestionProps {
  isSelected: boolean;
  onMouseOver: () => void;
  onMouseDown: () => void;
  children?: React.ReactNode;
}

export default function Suggestion({
  children,
  onMouseOver,
  onMouseDown,
  isSelected,
}: SuggestionProps) {
  const suggestion = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isSelected) return;

    suggestion.current?.scrollIntoView({
      block: "nearest",
    });
  }, [isSelected]);

  return (
    <button
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      className={`suggestion${isSelected ? " suggestion--selected" : ""}`}
      ref={suggestion}
    >
      {children}
    </button>
  );
}
