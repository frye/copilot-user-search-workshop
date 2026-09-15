// Deliberate teaching defect, never imported into application source.
export function faultyWindow(matches, limit) {
  const items = matches.slice(0, limit);
  return { items, total: items.length };
}
