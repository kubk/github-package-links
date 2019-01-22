export interface PackageManager {
  generatePackageLink(packageName: string): string | null;
  filterPackages(fileNode: Element): Element[];
  matchesPageUrl(url: string): boolean;
}
