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
