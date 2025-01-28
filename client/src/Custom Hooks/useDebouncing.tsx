import { useState, useEffect } from "react";

/**
 * A hook that debounces a given value. It takes a string, waits 1 second, and
 * then returns the string. This is useful for debouncing API calls, or any
 * other situation where you only want to run a function after a certain amount
 * of time has passed.
 * @param {string} value The value to debounce.
 * @returns {string} The debounced value.
 */
const useDebouncing = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 1000);

    // Cleanup the timeout on every render
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebouncing;
