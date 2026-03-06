import { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (searchTerm: string) => void
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [input, setInput] = useState<string>("");

  return (
    <input
      className={css.input}
      type="text"
      value={input}
      placeholder="Search notes"
      onChange={(e) => {
        setInput(e.target.value);
        onSearch(e.target.value);
      }}
    />
  );
}
