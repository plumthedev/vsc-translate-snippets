const html2pug: any = require('html2pug');

export default class jadeTranslator {
    private source;

    constructor(source: any) {
        this.source = source;
        this.start();
    }

    public start() {
        this.log('Starting translating');
        this.startTranslation();
    }

    private saveSource(source: string) {
        this.source = source;
    }

    private startTranslation() {
        const bodySnippets = this.getBodySnippets();

        this.log(`Translating ${bodySnippets.length} phrases`);

        bodySnippets.forEach((bodySnippet) => {
            const translatedSnippet = this.translateSingleSnippet(bodySnippet);
            const translatedSource = this.source.replace(bodySnippet, translatedSnippet);

            this.saveSource(translatedSource);
        });
    }

    private translateSingleSnippet(bodySnippet: string) {
        const parsedSnippet = this.parseSnippet(bodySnippet);
        const translatedSnippet = this.translateToPug(parsedSnippet);
        const translatedSnippetString = this.stringifySnippet(translatedSnippet);

        return translatedSnippetString;
    }

    private translateToPug(snippetBody) {
        return html2pug(snippetBody, { tabs: true, fragment: true });
    }

    private stringifySnippet(snippet) {
        const translatedSnippetArray = this.createTranslatedSnippedArray(snippet);
        const translatedSnippetString = JSON.stringify(translatedSnippetArray);

        return translatedSnippetString;
    }

    private parseSnippet(snippet) {
        const snippetBodyArray = JSON.parse(snippet);
        const snippetBodyString = this.conactSnippetBody(snippetBodyArray);

        return snippetBodyString;
    }

    private createTranslatedSnippedArray(translatedSnippet: string) {
        return translatedSnippet.split('\n');
    }

    private getBodySnippets() {
        const bodySnippetRegex = /(\[[\s\S]+?\])/g;
        const bodySnippets = this.source.match(bodySnippetRegex);
        return bodySnippets;
    }

    private conactSnippetBody(bodyArray: Array<string>) {
        return bodyArray.join('');
    }

    get getHtml() {
        return this.source;
    }

    private log(msg: string) {
        console.log(msg)
    }

}