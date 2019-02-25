const html2pug: any = require('html2pug');

import System from "./../modules/system";
import Expression from "./../modules/expression";

export default class jadeTranslator {
    private args: {
        source: string,
        translatedPath: string,
        translatedFilename: string
    };
    private system: System;
    private expression: Expression;
    private originalSource: string;
    private originalSourceSnippets: Array<string>;
    private translatedSource: string;
    private translatedSourceSnippets: Array<string>;

    constructor(args: {
        source: string,
        translatedPath: string,
        translatedFilename: string
    }) {
        this.args = args;
        this.system = new System();
        this.expression = new Expression();
        this.originalSource = this.system.readFile(this.args.source);
        this.originalSourceSnippets = new Array(0);
        this.translatedSource = this.system.readFile(this.args.source);
        this.translatedSourceSnippets = new Array(0);
    }

    public translate(): void {
        this.getSnippets();

        console.info(`Translating ${this.originalSourceSnippets.length} phrases`);

        this.originalSourceSnippets.forEach((snippet) => {
            const translatedSnippet = this.translateSingleSnippet(snippet);
            this.translatedSource = this.expression.replace(this.translatedSource, snippet, translatedSnippet)
        });

        this.system.createFile(this.translatedSource, this.args.translatedPath, this.args.translatedFilename);
        console.log('Translated!');
    }

    private prepareToTranslate(snippet: string): string{
        let preparedSnippet: any = this.expression.replace(snippet, '"body": ', '');
        preparedSnippet = this.expression.parse(preparedSnippet);

        if(preparedSnippet instanceof Array){
            preparedSnippet = this.expression.createString(preparedSnippet);
        }

        return preparedSnippet;
    }

    private translateSingleSnippet(snippet: string): string {
        const prepared = this.prepareToTranslate(snippet);
        const translated = this.translateToJade(prepared);

        return translated;
    }

    private translateToJade(snippetBody: string): string {
        const translated: string = html2pug(snippetBody, { tabs: true, fragment: true });
        const translatedArray: Array<string> = this.expression.createArray(translated, '\n');
        const stringify: string = this.expression.stringify(translatedArray);
        const readySnippet: string = this.expression.join('"body": ', stringify);

        this.translatedSourceSnippets.push(readySnippet);

        return readySnippet;
    }

    private getSnippets(): void {
        const bodySnippetRegex: RegExp = /("body": \"[\s\S]+?\"$)|("body": \[[\s\S]+?\])/gm;

        this.originalSourceSnippets = this.expression.match(bodySnippetRegex, this.originalSource);
    }

    get getOriginal(): string {
        return this.originalSource;
    }

    get getOriginalSnippets(): Array<string> {
        return this.originalSourceSnippets;
    }

    get getJade(): string{
        return this.translatedSource;
    }

    get getJadeSnippets(): Array<string>{
        return this.translatedSourceSnippets;
    }

}