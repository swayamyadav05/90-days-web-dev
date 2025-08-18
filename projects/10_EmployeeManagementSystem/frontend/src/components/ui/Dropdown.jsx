import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({
  value,
  options,
  onChange,
  variant = "default",
  size = "sm",
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getVariantStyles = () => {
    switch (variant) {
      case "status":
        switch (value) {
          case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-300";
          case "in-progress":
            return "bg-blue-100 text-blue-800 border-blue-300";
          case "completed":
            return "bg-green-100 text-green-800 border-green-300";
          case "cancelled":
            return "bg-red-100 text-red-800 border-red-300";
          default:
            return "bg-gray-100 text-gray-800 border-gray-300";
        }
      case "priority":
        switch (value) {
          case "low":
            return "bg-green-100 text-green-800 border-green-300";
          case "medium":
            return "bg-yellow-100 text-yellow-800 border-yellow-300";
          case "high":
            return "bg-red-100 text-red-800 border-red-300";
          default:
            return "bg-gray-100 text-gray-800 border-gray-300";
        }
      default:
        return "bg-white text-gray-800 border-gray-300";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "xs":
        return "px-2 py-1 text-xs";
      case "sm":
        return "px-3 py-1.5 text-sm";
      case "md":
        return "px-4 py-2 text-sm";
      case "lg":
        return "px-6 py-3 text-base";
      default:
        return "px-3 py-1.5 text-sm";
    }
  };

  const currentOption = options.find(
    (option) => option.value === value
  );

  return (
    <div
      className={`relative inline-block ${className}`}
      ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          ${getVariantStyles()}
          ${getSizeStyles()}
          border-2 rounded-sm font-medium
          flex items-center justify-between gap-2
          transition-all duration-150
          hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
          focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
          disabled:opacity-50 disabled:cursor-not-allowed
          min-w-[100px]
        `}>
        <span className="capitalize">
          {currentOption?.label || value}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-150 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 w-full bg-white border-2 border-black rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                w-full px-3 py-2 text-left text-sm
                hover:bg-gray-100 transition-colors
                first:rounded-t-sm last:rounded-b-sm
                border-b border-gray-200 last:border-b-0
                ${
                  option.value === value
                    ? "bg-gray-50 font-medium"
                    : ""
                }
              `}>
              <span className="capitalize">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
