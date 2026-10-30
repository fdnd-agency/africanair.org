import { get } from 'svelte/store';
import { selectedStandard, standards } from '$lib/relatives.js';

const colorTints = [
  { h: 160, s: 100, l: 58 }, // --status-good 
  { h: 50,  s: 100, l: 50 }, // --status-medium 
  { h: 30,  s: 100, l: 50 }, // --status-high 
  { h: 0,   s: 100, l: 42 }, // --status-hazardous 
  { h: 282, s: 100, l: 24 }  //  Purple 
];

export function getAqiColor(value) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return null; 
  }

  const currentChoice = get(selectedStandard);
  const t = standards[currentChoice] || standards.EU;

  const colorStops = [
    { pos: 0,          ...colorTints[0] },
    { pos: t[0],       ...colorTints[1] },
    { pos: t[1],       ...colorTints[2] },
    { pos: t[2],       ...colorTints[3] },
    { pos: t[2] * 1.5, ...colorTints[4] } 
  ];

  const val = Math.max(0, value);
  let lower = colorStops[0];
  let upper = colorStops[colorStops.length - 1];

  for (let i = 0; i < colorStops.length - 1; i++) {
    if (val >= colorStops[i].pos && val <= colorStops[i + 1].pos) {
      lower = colorStops[i];
      upper = colorStops[i + 1];
      break;
    }
  }

  if (val >= upper.pos) {
    return `hsl(${upper.h} ${upper.s}% ${upper.l}%)`;
  }

  const range = upper.pos - lower.pos;
  const progress = range === 0 ? 0 : (val - lower.pos) / range;

  // prevent it from jumping colors
  let dh = upper.h - lower.h;
  if (dh > 180) dh -= 360;
  if (dh < -180) dh += 360;
  
  let h = Math.round(lower.h + dh * progress);
  if (h < 0) h += 360;
  if (h >= 360) h -= 360;

  const s = Math.round(lower.s + (upper.s - lower.s) * progress);
  const l = Math.round(lower.l + (upper.l - lower.l) * progress);

  return `hsl(${h} ${s}% ${l}%)`;
}