export default class Expression {
    public replace(string: string, find: RegExp | string, replace: string) {
        return string.replace(find, replace);
    }

    public match(pattern: RegExp, string: string): Array<string> {
        return string.match(pattern);
    }

    public parse(json: string): object {
        return JSON.parse(json);
    }

    public createString(array: Array<string>, glue: string = ''): string {
        return array.join(glue);
    }

    public createArray(string: string, delimiter: string) {
        return string.split(delimiter);
    }

    public stringify(value: any): string {
        return JSON.stringify(value);
    }

    public join(main: string, addon: string) {
        return main.concat(addon);
    }
}