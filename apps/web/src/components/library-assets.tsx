export const libraryAsset = (name: string) => `${import.meta.env.BASE_URL}images/library/${name}`;

export function LibraryIcon({ name, isInk = false }: { name: string; isInk?: boolean }) {
  return <img src={libraryAsset(`${name}.svg`)} width={16} height={name === "arrow-right" ? 16 : 18} alt="" aria-hidden="true" className={`library-icon${isInk ? " library-ink-icon" : ""}`} />;
}
