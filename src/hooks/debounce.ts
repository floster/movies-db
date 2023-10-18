import { useEffect, useState } from 'react'

/**
 * A custom hook that debounces a value using `setTimeout`.
 * @param {string} value The value to debounce.
 * @param {number} [delay=300] The delay in milliseconds to wait before updating the debounced value.
 * @returns {string} The debounced value.
 */
export function useDebounce(value: string, delay: number = 300): string {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}
