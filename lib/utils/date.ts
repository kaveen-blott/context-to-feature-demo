/**
 * Format a date string to "DD MMM YYYY" format (e.g., "19 Aug 2021")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Format a date string with "Due" prefix (e.g., "Due 19 Aug 2021")
 */
export function formatDueDate(dateString: string): string {
  return `Due ${formatDate(dateString)}`;
}
