import System from '../../src/modules/system';
import { dirname } from 'path';

const fs: any = require('fs');
const system: any = new System();

describe('operation on file and folders', () => {

    test('file reading', () => {
        const file: string = system.readFile(`${__dirname}/systemDummy.json`);
        const json: JSON = JSON.parse(file);
        expect(json).toHaveProperty('type', 'json');
    })

    describe("file/folder creation", () => {
        const path: string = `${__dirname}/dummy`;
        const string: string = "The quick brown fox jumps over the lazy dog.";;
        afterAll(() => {
            fs.unlinkSync(`${__dirname}/dummyFile.txt`);
            fs.rmdirSync(`${__dirname}/dummy`);
        })
        test("folder creation", () => {
            system.createFolder(path);
            const check: boolean = fs.existsSync(path);
            expect(check).toBe(true);
        })
        test("checking if folder exist", () => {
            const fileExist: boolean = system.isFolderExits(path)
            expect(fileExist).toBe(true);
        })

        test("create file", () => {
            system.createFile(string, __dirname, "/dummyFile.txt");
            const fileExist: undefined = fs.accessSync(path);
            const source: string = fs.readFileSync(`${__dirname}/dummyFile.txt`, 'utf8');
            expect(fileExist).toBe(undefined);
            expect(source).toEqual(string);
        })

    })
})