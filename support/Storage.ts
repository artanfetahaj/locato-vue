export default class Storage {
  public static prefix(): string {
    const defaultPrefix = process.env.VUE_APP_LOCAL_STORAGE_TOKEN || 'com.locato_';

    return `${defaultPrefix}`;
  }

  public static title(key: string): string {
    return Storage.prefix() + key;
  }

  public static has(key: string): boolean {
    return !! Storage.get(key);
  }

  public static get(key: string): string | null {
    return localStorage.getItem(Storage.title(key));
  }

  public static set(key: string, value: string): void {
    localStorage.setItem(Storage.title(key), value);
  }

  public static delete(key: string): void {
    localStorage.removeItem(Storage.title(key));
  }
}
