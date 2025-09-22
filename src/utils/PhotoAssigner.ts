const malePhotoModules = import.meta.glob("../assets/Driver/Male/*.avif", {
  eager: true,
});

const femalePhotoModules = import.meta.glob("../assets/Driver/Female/*.png", {
  eager: true,
});

// Helper function to extract photo URLs from modules
function extractPhotoUrls(modules: Record<string, unknown>): string[] {
  return Object.values(modules)
    .map((module) => {
      if (module && typeof module === "object" && "default" in module) {
        return (module as { default: string }).default;
      }
      return null;
    })
    .filter(Boolean) as string[];
}

const malePhotos = extractPhotoUrls(malePhotoModules);
const femalePhotos = extractPhotoUrls(femalePhotoModules);

export function getRandomMalePhoto(): string | undefined {
  if (malePhotos.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * malePhotos.length);
  return malePhotos[randomIndex];
}

export function getRandomFemalePhoto(): string | undefined {
  if (femalePhotos.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * femalePhotos.length);
  return femalePhotos[randomIndex];
}

export function getRandomDriverPhoto(gender: string): string | undefined {
  if (gender === "male") return getRandomMalePhoto();
  if (gender === "female") return getRandomFemalePhoto();

  // If no gender specified, pick from all photos
  const allPhotos = [...malePhotos, ...femalePhotos];
  if (allPhotos.length === 0) return undefined;

  const randomIndex = Math.floor(Math.random() * allPhotos.length);
  return allPhotos[randomIndex];
}
