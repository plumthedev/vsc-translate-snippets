import System from '../../src/modules/system';
import utility from '../utilityFunctions';
const fs: any = require('fs');
const system: any = new System();
const sort:any = new utility();

describe('operation on file and folders', () => {

    const path: string = `${__dirname}/dummy`;
    const string: string = "The quick brown fox jumps over the lazy dog.";

    test('file reading', () => {
        const file: string = system.readFile(`${__dirname}/systemDummy.json`);
        const received = sort.removeWhiteCharacters().string(file);
        const expected = sort.removeWhiteCharacters().string('{"type": "json","body": "<div></div>"}');
        expect(received).toEqual(expected);
    })

    describe("folder operation", () => {
        afterAll(() => {
            fs.rmdirSync(`${__dirname}/dummy`);
        })

        test("folder creation", () => {
            system.createFolder(path);
            const received: boolean = fs.existsSync(path);
            expect(received).toBe(true);
        })

        test("checking if folder exist", () => {
            const received: boolean = system.isFolderExits(path)
            expect(received).toBe(true);
        })
    })
    
    describe("create file", () => {

        afterAll(()=>{
            fs.unlinkSync(`${path}/dummyFile.txt`);
            fs.rmdirSync(path);
        })

        system.createFile(string, path, "/dummyFile.txt");
        const recievedExist: undefined = fs.accessSync(`${path}/dummyFile.txt`);
        const receivedValue: string = fs.readFileSync(`${path}/dummyFile.txt`, 'utf8');
        
        test("did file was created",()=>{
            expect(recievedExist).toBe(undefined);
        })
        
        test("did value of file is expected",()=>{
            expect(receivedValue).toEqual(string);
        })

    })
})