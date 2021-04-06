export default class Session {
  public static prefix(): string {
    const defaultPrefix = process.env.VUE_APP_LOCAL_STORAGE_TOKEN || 'com.locato_';

    return `${defaultPrefix}`;
  }

  public static title(key: string): string {
    return Session.prefix() + key;
  }

  public static has(key: string): boolean {
    return !! Session.get(key);
  }

  public static get(key: string): string | null {
    return sessionStorage.getItem(Session.title(key));
  }

  public static set(key: string, value: string): void {
    sessionStorage.setItem(Session.title(key), value);
  }

  public static delete(key: string): void {
    sessionStorage.removeItem(Session.title(key));
  }
}
