/**
 * Format a number as GBP currency (e.g., "£ 1,800.90")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  })
    .format(amount)
    .replace("£", "£ "); // Add space after pound sign to match Figma
}
