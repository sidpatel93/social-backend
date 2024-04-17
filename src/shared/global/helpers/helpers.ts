export class Helpers {
  static firstLetterUppercase(str: string): string {
    const valueString = str;
    return valueString
      .split(" ")
      .map(
        (word) =>
          `${word.charAt(0).toUpperCase()}${word.slice(1).toLocaleLowerCase}`
      )
      .join(" ");
  }

  static lowercase(str: string): string {
    return str.toLocaleLowerCase();
  }

  // A function to generate random integers of the desired length
  static generateRandomIntegers(length: number): number {
    return Math.floor(Math.random() * Math.pow(10, length));
  }
}
