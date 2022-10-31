import { CloseIcon } from "../Icons";

import "./DropdownMenu.css";

interface DropdownMenuProps {
  children: React.ReactNode;
  closeMenu: () => void;
}

export default function DropdownMenu({
  children,
  closeMenu,
}: DropdownMenuProps) {
  return (
    <div className="dropdown-menu">
      <button
        className="dropdown-menu__close-button"
        type="button"
        aria-label="Close the dropdown menu"
        onClick={closeMenu}
      >
        <CloseIcon />
      </button>
      <div>{children}</div>
    </div>
  );
}
