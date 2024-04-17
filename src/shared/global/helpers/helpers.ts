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
}
