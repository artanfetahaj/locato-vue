/* eslint-disable */

export default class InstanceLoader {
  public static get(className: string, ...args: any[]) {
    // if (Models[className] === undefined || Models[className] === null) {
    //   `Class type of \'${className}\' has not been added to the InstanceLoader.`;
    //   throw new Error();
    // }

    // eslint-disable-next-line
    return new (require(`@/models/${className}`) as any)[className](...args);
    // return new Models[className](...args);
  }
}
