// src/app/context/CartContext.ts
import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Function to initialize the state.  Use useCallback to memoize it and prevent unnecessary re-renders.
  const initializeState = useCallback(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) as T : initialValue;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(initializeState);

  // Wrap setValue in useCallback to prevent unnecessary re-renders
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Determine the value to store.
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Update the state.
        setStoredValue(valueToStore);

        // Persist to local storage if in a browser environment.
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    },
    [key, storedValue] //  dependencies:  key and storedValue,
  );

  // Refactor useEffect to use useCallback for the event handler and clean-up.
  const handleStorageChange = useCallback(
    (event: StorageEvent) => {
      if (event.key === key) {
        try {
          setStoredValue((event.newValue ? JSON.parse(event.newValue) : initialValue) as T);
        } catch (error) {
          console.error("Error parsing localStorage value:", error);
          setStoredValue(initialValue); // Use initialValue as fallback
        }
      }
    },
    [key, initialValue] // dependencies: key, initialValue
  );

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [handleStorageChange]);  // Dependency on memoized handleStorageChange

  return [storedValue, setValue] as const;
}