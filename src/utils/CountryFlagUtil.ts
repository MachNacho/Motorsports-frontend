const flagModules = import.meta.glob("../assets/Flags/*.svg", { eager: true });

const flagMap: Record<string, string> = {};

Object.entries(flagModules).forEach(([path, module]) => {
  const fileName = path
    .split("/")
    .pop()
    ?.replace(".svg", "")
    .replace(/_/g, " ");
  if (fileName && module && typeof module === "object" && "default" in module) {
    flagMap[fileName] = (module as { default: string }).default;
  }
});

export function getFlagFromName(input: string): string | undefined {
  return flagMap[input];
}
