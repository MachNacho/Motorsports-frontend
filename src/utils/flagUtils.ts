/**
 * This utility dynamically imports all flag SVGs from both the 1x1 and 4x3 folders.
 * It then exposes two helper functions to fetch the correct flag image URL by filename.
 */

type FlagRatio = "1x1" | "4x3";

/**
 * Import all flag SVGs from the 1x1 and 4x3 directories eagerly.
 * Vite's import.meta.glob returns a map of file paths to modules.
 */
const flagModules: Record<FlagRatio, Record<string, string>> = {
  "1x1": {},
  "4x3": {},
};

// Dynamically load all 1x1 flag modules
const flagModules1x1 = import.meta.glob("../assets/flags/1x1/*.svg", {
  eager: true,
});
// Dynamically load all 4x3 flag modules
const flagModules4x3 = import.meta.glob("../assets/flags/4x3/*.svg", {
  eager: true,
});


// Utility to build a flag map for a given ratio
function buildFlagMap(
  modules: Record<string, unknown>,
  ratio: FlagRatio
): Record<string, string> {
  const map: Record<string, string> = {};

  Object.entries(modules).forEach(([path, module]) => {
    // Extract just the filename (e.g., "mc" from ".../mc.svg")
    const fileName = path.split("/").pop()?.replace(".svg", "");
    if (!fileName) return;

    // Validate module structure before accessing default export
    if (module && typeof module === "object" && "default" in module) {
      map[fileName] = (module as { default: string }).default;
    }
  });

  flagModules[ratio] = map;
  return map;
}

// Initialize both maps
buildFlagMap(flagModules1x1, "1x1");
buildFlagMap(flagModules4x3, "4x3");

/**
 * Fetches a flag by name and ratio (e.g., "mc" and "1x1").
 * @param name - The flag filename without extension (e.g., "mc").
 * @param ratio - Either "1x1" or "4x3".
 * @returns The flag image URL or undefined if not found.
 */
export function getFlag(name: string, ratio: FlagRatio): string | undefined {
  return flagModules[ratio][name];
}

/**
 * Fetches the 1x1 version of a flag.
 * @param name - The flag filename without extension (e.g., "mc").
 */
export function getFlag1x1(name: string): string | undefined {
  return getFlag(name, "1x1");
}

/**
 * Fetches the 4x3 version of a flag.
 * @param name - The flag filename without extension (e.g., "mc").
 */
export function getFlag4x3(name: string): string | undefined {
  return getFlag(name, "4x3");
}