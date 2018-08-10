export default interface PackageManager {
    linkToPackage(packageName: string): string;

    getLinesWithPackages(fileNode: Element): Element[];

    matchesPageUrl(url: string): boolean;
}