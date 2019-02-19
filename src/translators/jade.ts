const html2pug: any = require('html2pug');
const fs: any = require('fs');

export default class jadeTranslator{
    private source;
    private options;

    constructor(options: any){
        this.source = '';
        this.options = options;
    }

    private readFile(){
        this.log(`Reading ${this.options.sourceFile} file`);

        fs.readFile(this.options.sourceFile, 'utf8', (err, contents) => {
            if(err) throw err;
            this.log('Read correctly');
            this.saveSource(contents);
            this.startTranslation();
        });
    }

    private saveSource(source: string){
        this.source = source;
    }

    private parseSnippet(snippet){
        const snippetBodyArray = JSON.parse(snippet);
        const snippetBodyString = this.conactSnippetBody(snippetBodyArray);

        return snippetBodyString;
    }

    private stringifySnippet(snippet){
        const translatedSnippetArray = this.createTranslatedSnippedArray(snippet);
        const translatedSnippetString = JSON.stringify(translatedSnippetArray);

        return translatedSnippetString;
    }

    private translateSingleSnippet(bodySnippet: string){
        const parsedSnippet = this.parseSnippet(bodySnippet);
        const translatedSnippet = this.translateToPug(parsedSnippet);
        const translatedSnippetString = this.stringifySnippet(translatedSnippet);

        return translatedSnippetString;
    }

    private startTranslation(){
        const bodySnippets = this.getBodySnippets();
        
        this.log(`Translating ${bodySnippets.length} phrases`);

        bodySnippets.forEach((bodySnippet) => {
            const translatedSnippet = this.translateSingleSnippet(bodySnippet);
            const translatedSource = this.source.replace(bodySnippet, translatedSnippet);

            this.saveSource(translatedSource);
        });
        
        this.createTranslatedFile();
    }

    private getBodySnippets(){
        const bodySnippetRegex = /(\[[\s\S]+?\])/g;
        const bodySnippets = this.source.match(bodySnippetRegex);

        return bodySnippets;
    }

    private createTranslatedFile(){
        this.log(`Creating a file with translations`);

        this.createFolderForTranslated();

        fs.writeFile(`./translated/${this.options.filename}`, this.source, (err) => {
            if(err) throw err;
            this.log('Work has been completed');
        });
    }

    private createFolderForTranslated(){
        if(!fs.existsSync('./translated')){
            fs.mkdirSync('./translated');
        }
    }

    private translateToPug(snippetBody){
        return html2pug(snippetBody, { tabs: true, fragment: true });
    }

    private conactSnippetBody(bodyArray: Array<string>){
        return bodyArray.join('');
    }

    private createTranslatedSnippedArray(translatedSnippet: string){
        return translatedSnippet.split('\n');
    }

    private log(msg: string){
        console.log(msg)
    }

    public start(){
        this.log('Starting translating');
        this.readFile();
    }
}