/** Prefix a public asset path with the deployment base path (needed for GitHub Pages project sites). */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
