// src/ChipInput.tsx
// src/ChipInput.tsx
// src/ChipInput.tsx
// src/ChipInput.tsx

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import "./input.css"; // Create this file for styling

interface Chip {
  id: number;
  label: string;
  email: string;
}

const ChipInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<Chip[]>([]);
  const [highlightedChip, setHighlightedChip] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Chip[] = [
    { id: 1, label: "Nick Giannopoulos", email: "nick@example.com" },
    { id: 2, label: "John Doe", email: "john@example.com" },
    { id: 3, label: "Jane Smith", email: "jane@example.com" },
    // Add more items as needed
  ];

  useEffect(() => {
    const filtered = items.filter(
      (item) =>
        !chips.find(
          (chip) => chip.label === item.label || chip.email === item.email
        )
    );
    setFilteredItems(filtered);
  }, [chips]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setHighlightedChip(null);
  };

  const handleItemClick = (item: Chip) => {
    setChips((prevChips) => [...prevChips, { id: Date.now(), ...item }]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const handleChipRemove = (id: number) => {
    setChips((prevChips) => prevChips.filter((chip) => chip.id !== id));
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "") {
      if (highlightedChip === null) {
        const lastChip = chips[chips.length - 1];
        if (lastChip) {
          setHighlightedChip(lastChip.id);
        }
      } else {
        handleChipRemove(highlightedChip);
        setHighlightedChip(null);
      }
    }
  };

  return (
    <div className="chip-input">
      <div className="chips-container">
        {chips.map((chip) => (
          <div
            key={chip.id}
            className={`chip ${
              highlightedChip === chip.id ? "highlighted" : ""
            }`}
          >
            {chip.label}
            <span className="email">{chip.email}</span>
            <span
              className="remove-icon"
              onClick={() => handleChipRemove(chip.id)}
            >
              X
            </span>
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type here..."
      />
      <div className="items-list">
        {filteredItems
          .filter(
            (item) =>
              item.label.toLowerCase().includes(inputValue.toLowerCase()) ||
              item.email.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((item) => (
            <div
              key={item.id}
              className="item"
              onClick={() => handleItemClick(item)}
            >
              {item.label}
              <span className="email">{item.email}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChipInput;
