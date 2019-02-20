const fs: any = require('fs');

export default class jadeData {
    private source;
    private options;

    constructor(options: any) {
        this.source = "";
        this.options = options;
        this.start();
    }

    public start() {
        this.log('Starting translating');
        this.readFile();
    }
    private readFile() {
        this.log(`Reading ${this.options.sourceFile} file`);

        var data = fs.readFileSync(this.options.sourceFile, 'utf8');
        this.saveSource(data);
    }

    private saveSource(source: string) {
        this.source = source;
    }

    private log(msg: string) {
        console.log(msg)
    }
    get getFile() {
        return this.source;
    }

    private createTranslatedFile(data) {
        this.log(`Creating a file with translations`);

        this.createFolderForTranslated();

        fs.writeFile(`./translated/${this.options.filename}`, data, (err) => {
            if (err) throw err;
            this.log('Work has been completed');
        });
    }

    private createFolderForTranslated() {
        if (!fs.existsSync('./translated')) {
            fs.mkdirSync('./translated');
        }
    }

    public save(data) {
        this.createTranslatedFile(data);
    }

}