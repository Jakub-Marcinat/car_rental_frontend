import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button``;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #1e1e1e;
  border-radius: 8px;
  margin-top: 5px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2a2a2a;
  }
`;

const Checkbox = styled.input`
  accent-color: #facc15; /* Yellow checkbox */
  transform: scale(1.2);
`;

export default function CustomMultiSelectDropdown({
  label,
  options,
  selectedOptions,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onChange([...selectedOptions, value]);
    } else {
      onChange(selectedOptions.filter((opt) => opt !== value));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContainer ref={dropdownRef} className="custom-select">
      <label className="text-base">{label}</label>
      <DropdownButton onClick={toggleDropdown}>
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Vyberte doplnky"}
      </DropdownButton>

      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <OptionLabel key={option}>
              <Checkbox
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={handleChange}
              />
              {option}
            </OptionLabel>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}
