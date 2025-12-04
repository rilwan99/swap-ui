// Formats a number with comma separators for thousands
export const formatNumberWithCommas = (value: string | number): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0";

  // Split into integer and decimal parts
  const parts = num.toString().split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Keep decimal part if it exists
  return parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
};

// Formats large numbers with K, M, B, T suffixes for better readability
export const formatLargeNumber = (value: string | number): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0";

  const absNum = Math.abs(num);

  if (absNum >= 1e12) {
    return `${(num / 1e12).toFixed(2)}T`;
  }
  if (absNum >= 1e9) {
    return `${(num / 1e9).toFixed(2)}B`;
  }
  if (absNum >= 1e6) {
    return `${(num / 1e6).toFixed(2)}M`;
  }
  if (absNum >= 1e3) {
    return `${(num / 1e3).toFixed(2)}K`;
  }

  return formatNumberWithCommas(value);
};

// Smart formatter that uses abbreviation for very long numbers
export const formatTokenAmount = (value: string | number): string => {
  const formatted = formatNumberWithCommas(value);
  // If the formatted string is too long (more than 15 characters), use abbreviation
  if (formatted.length > 15) {
    return formatLargeNumber(value);
  }
  return formatted;
};

// Removes comma separators from a formatted number string
export const removeCommas = (value: string): string => {
  return value.replace(/,/g, "");
};

// Validates if a string represents a valid positive number
export const isValidPositiveNumber = (value: string): boolean => {
  if (value === "") return true; // Allow empty string
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
};
