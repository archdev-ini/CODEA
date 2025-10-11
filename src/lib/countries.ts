import { codeLibraries } from './codes';

export type Country = {
  value: string;
  label: string;
};

// We can't dynamically import in this environment, so we manage the list here.
// When a new country data file is added in `lib/codes.ts`, it must be added to this list.
const countryDataSources = ['nigeria'];

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export function getCountryCodes(): [string, ...string[]] {
  const codes = Object.keys(codeLibraries);
  if (codes.length === 0) {
    // Zod's `enum` requires at least one value.
    // This is a fallback for when no countries are loaded, though it should not happen in practice.
    return [''];
  }
  return codes as [string, ...string[]];
}

export function availableCountries(): Country[] {
  return getCountryCodes()
    .filter((code) => code) // Filter out empty fallback string
    .map((code) => ({
      value: code,
      label: toTitleCase(code),
    }));
}
