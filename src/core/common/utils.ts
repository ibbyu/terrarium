import type { ReadonlyURLSearchParams } from "next/navigation";

export function toSlugCase(modName: string) {
  return modName.replace(/\s+/g, '-').toLowerCase();
}

export function createUrl(pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) {
  const paramsString = params.toString();
  const queryString = `${paramsString ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
}