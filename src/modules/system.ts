const fs: any = require('fs');

export default class System {
    public readFile(fileToReadPath: string) {
        const source: string = fs.readFileSync(fileToReadPath, 'utf8');

        return source;
    }

    public createFile(data: string, path: string, filename: string) {
        this.createFolder(path);

        fs.writeFileSync(`${path}${filename}`, data, (err: any) => {
            if (err) throw err;
        });
    }

    public createFolder(path: string) {
        if (!this.isFolderExits(path)) {
            fs.mkdirSync(path);
        }
    }

    public isFolderExits(path: string) {
        return fs.existsSync(path)
    }

}