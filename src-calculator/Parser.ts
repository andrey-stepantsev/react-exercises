export function parse(expText: string): Array<string> | null {
  return expText.toLowerCase().match(/(\d+|cos|sin|tg|\S)/g);
}
