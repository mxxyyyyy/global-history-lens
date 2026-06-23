const ABSOLUTE_URL_PATTERN = /^(?:[a-z]+:)?\/\//i;

export function assetUrl(path: string) {
  if (!path) return path;
  if (ABSOLUTE_URL_PATTERN.test(path) || path.startsWith("data:")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
}
