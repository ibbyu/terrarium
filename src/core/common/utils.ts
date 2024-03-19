export function toSlugCase(modName: string) {
  return modName.replace(/\s+/g, '-').toLowerCase();
}