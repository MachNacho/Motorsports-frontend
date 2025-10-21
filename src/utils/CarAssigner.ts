/**
 * Utility to dynamically load and fetch car images by number.
 *
 * Example:
 *   getCarImage(1)   // returns Car1.avif
 *   getRandomCar()   // returns a random car image
 */

const carModules = import.meta.glob("../assets/Car/*.avif", { eager: true });

// Internal map of car number → image URL
const carMap: Record<number, string> = {};

/**
 * Builds the car map based on filenames (e.g., Car1.avif → key: 1).
 */
function buildCarMap(): Record<number, string> {
  Object.entries(carModules).forEach(([path, module]) => {
    const fileName = path.split("/").pop()?.replace(".avif", "") ?? "";
    const match = fileName.match(/car(\d+)/i); // Case-insensitive
    if (!match) return;

    const number = parseInt(match[1], 10);
    if (module && typeof module === "object" && "default" in module) {
      carMap[number] = (module as { default: string }).default;
    }
  });

  return carMap;
}

// Build once on load
buildCarMap();

/**
 * Fetches a car image by its number (e.g., 1 → Car1.avif).
 * If not found, returns a random car instead.
 */
export function getCarImage(number: number): string {
  if (carMap[number]) return carMap[number];
  return getRandomCar();
}

/**
 * Returns a random car image from the available ones.
 */
export function getRandomCar(): string {
  const carNumbers = Object.keys(carMap).map(Number);
  if (carNumbers.length === 0) {
    console.warn("No car images found in assets/Car/");
    return "";
  }

  const randomIndex = Math.floor(Math.random() * carNumbers.length);
  const randomKey = carNumbers[randomIndex];
  return carMap[randomKey];
}

/**
 * Returns a list of all available car numbers.
 */
export function getAvailableCars(): number[] {
  return Object.keys(carMap).map(Number);
}
