import React, { useState, useCallback } from "react";

// Switch Component
const Switch = React.forwardRef((props, ref) => {
  const {
    checked,
    onCheckedChange,
    className,
    id,
    name,
    "aria-label": ariaLabel,
    ...otherProps // Collect any other props
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = useCallback(
    (event) => {
      // Use useCallback
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onCheckedChange(!checked);
      }
    },
    [checked, onCheckedChange]
  ); // Add dependencies to useCallback

  const handleClick = useCallback(() => {
    // New handleClick function
    onCheckedChange(!checked);
  }, [checked, onCheckedChange]);

  return (
    <div
      className={
        "relative inline-flex items-center cursor-pointer " + (className || "")
      }
      onClick={handleClick} // Make the whole div clickable
      role="switch" // Add role for accessibility
      aria-checked={checked} // Add aria-checked for accessibility
      tabIndex={0} // Make the div focusable
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      {...otherProps} // Spread any other props
    >
      <input
        ref={ref}
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only peer"
        aria-label={ariaLabel}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        {...props} // Spread props again, to make sure checked and onchange work.
      />
      <div
        className={
          "w-11 h-6 rounded-full " +
          "peer-focus:ring-2 peer-focus:ring-yellow-500 " +
          "bg-gray-700  " +
          "dark:bg-gray-700 " +
          "peer-checked:bg-yellow-500 " +
          "after:content-[''] after:absolute after:top-[2px] after:left-[2px] " +
          "after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all " +
          "peer-checked:after:translate-x-full"
        }
      ></div>
    </div>
  );
});
Switch.displayName = "Switch";

export { Switch };
