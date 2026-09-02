/** Pad a string to a fixed width (monospace-friendly). */
export function pad(text: string, width: number): string {
  const len = text.length;
  if (len >= width) return text;
  return text + ' '.repeat(width - len);
}

/** Pad a value on the right by a fixed column width. */
export function col(text: string, width: number): string {
  return pad(text, width);
}

/** Build a simple monospaced table body from rows of cells. */
export function table(headers: string[], rows: string[][], widths: number[]): string[] {
  const result: string[] = [headerRow(headers, widths)];
  for (const row of rows) {
    result.push(
      row
        .map((cell, i) => col(cell, widths[i] ?? 10))
        .join('')
        .trimEnd(),
    );
  }
  return result;
}

export function headerRow(headers: string[], widths: number[]): string {
  return headers.map((h, i) => col(h, widths[i] ?? 10)).join('').trimEnd();
}

/** Compute per-column widths so all rows align. */
export function columnWidths(rows: string[][], min = 8): number[] {
  const width = Math.max(...rows.map((r) => r.length));
  const widths: number[] = [];
  for (let i = 0; i < width; i++) {
    widths.push(Math.max(min, ...rows.map((r) => (r[i] ?? '').length).filter((n) => !isNaN(n))));
  }
  return widths;
}

/** Repeat a box-drawing char to make a divider line. */
export function rule(char = '─', length = 56): string {
  return char.repeat(length);
}
