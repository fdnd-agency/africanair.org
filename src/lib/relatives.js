import { writable, get } from 'svelte/store';

const standards = {
  EU: [20, 40, 80],
  WHO: [10, 25, 50]
};

export const selectedStandard = writable('EU');

export const statusChecker = (value) => {
  const currentChoice = get(selectedStandard); 
  const activeStandard = standards[currentChoice];

  if (value === null || value === undefined) {
    return "empty";
  }
  
  if (value < activeStandard[0]) return "low";
  if (value < activeStandard[1]) return "medium";
  if (value < activeStandard[2]) return "high";
  if (value >= activeStandard[2]) return "hazardous";
  
  return "empty";
};