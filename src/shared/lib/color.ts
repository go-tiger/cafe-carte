function srgbChannelToLinear(channel: number): number {
  const v = channel / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function getRelativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * srgbChannelToLinear(r) + 0.7152 * srgbChannelToLinear(g) + 0.0722 * srgbChannelToLinear(b);
}

export function getContrastColor(hex: string): 'white' | 'black' {
  return getRelativeLuminance(hex) > 0.179 ? 'black' : 'white';
}

export function getMemberSurface(hex: string): string {
  const lightnessClause = getContrastColor(hex) === 'black' ? 'max(l, 0.75)' : 'min(l, 0.35)';
  return `oklch(from ${hex} ${lightnessClause} min(c, 0.2) h)`;
}
