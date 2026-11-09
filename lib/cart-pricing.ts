// Demo promotion: 15% off each pair of the same product; odd units stay full price.
// Always calculate from the original unit price in integer bani, never a prior total.
export function calculateDemoCartLine(unitPriceRON: number, quantity: number) {
  const unitBani = Math.round(unitPriceRON * 100);
  const units = Math.max(0, Math.floor(quantity));
  const pairedUnits = Math.floor(units / 2) * 2;
  const subtotalBani = unitBani * units;
  const discountBani = Math.round(unitBani * pairedUnits * 15 / 100);
  return { quantity: units, subtotalRON: subtotalBani / 100,
    discountRON: discountBani / 100, totalRON: (subtotalBani - discountBani) / 100 };
}
