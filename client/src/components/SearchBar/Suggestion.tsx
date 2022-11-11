import { useEffect, useRef } from "react";

interface SuggestionProps
  extends React.DetailedHTMLProps<
    React.HTMLProps<HTMLDivElement>,
    HTMLDivElement
  > {
  isSelected: boolean;
}

export default function Suggestion({
  children,
  isSelected,
  ...attributtes
}: SuggestionProps) {
  const suggestion = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSelected) return;

    suggestion.current?.scrollIntoView({
      block: "nearest",
    });
  }, [isSelected]);

  return (
    <div
      {...attributtes}
      className={`suggestion${isSelected ? " suggestion--selected" : ""}`}
      ref={suggestion}
    >
      {children}
    </div>
  );
}
