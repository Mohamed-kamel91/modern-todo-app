/**
 * Formats the input text by trimming whitespace and converting it to lowercase.
 * @param text - The text to format.
 * @returns The formatted text.
 */
export const formatText = (text: string = ''): string => {
  return text.trim().toLowerCase();
};

/**
 * Capitalizes the first letter of each word in the input text.
 * @param text - The text to capitalize.
 * @returns The text with the first letter of each word capitalized.
 */
export const capitalize = (text: string): string => {
  const splitText = formatText(text).split(' ');

  const capitalizedTextArr = splitText
    .filter((str) => str !== '') // exclude empty strings
    .map(capitalizeFirst);

  return capitalizedTextArr.join(' ');
};

/**
 * Capitalizes the first letter of the input text.
 * @param text - The text to capitalize.
 * @returns The text with the first letter capitalized.
 */
export const capitalizeFirst = (text: string): string => {
  if (text.length === 0) return text;

  const formattedText = formatText(text);
  return formattedText[0].toUpperCase() + formattedText.slice(1);
};
