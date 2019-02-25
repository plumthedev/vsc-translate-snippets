import Jade from "../../src/translators/jade";
import clean from "../utilityFunctions";

const sort = new clean();
const fs: any = require('fs');
const args = {
    source: `${__dirname}/dummydata.json`,
    translatedPath: `${__dirname}`,
    translatedFilename: "/translated.json"
}
const jade = new Jade(args);
const jadePrivate = (jade as any);

describe("test public API", () => {
    afterAll(() => {
        fs.unlinkSync(`${__dirname}/translated.json`);
    })
    test("translate source to pug", () => {
        jade.translate();
        const received = fs.readFileSync(`${__dirname}/translated.json`);
        const expected = fs.readFileSync(`${__dirname}/example.json`);
        expect(received).toEqual(expected);
    })
})

describe("test private API", () => {
    const dummyData = {
        rawSnippet: ['"body": "<span class=\\"badge badge-pill badge-${1|primary,secondary,success,danger,warning,info,light,dark|}\\">${2:Text}</span>"', '"body": [\r\n            "<div class=\\"alert alert-${1|primary,secondary,success,danger,warning,info,light,dark|}\\" role=\\"alert\\">",\r\n            "\\t${2:Content}",\r\n            "</div>"\r\n        ]'],
        snippet: ['<span class="badge badge-pill badge-${1|primary,secondary,success,danger,warning,info,light,dark|}">${2:Text}</span>', '<div class="alert alert-${1|primary,secondary,success,danger,warning,info,light,dark|}" role="alert">${2:Content}</div>'],
        pug: ['"body": ["span.badge.badge-pill.badge-${1|primary,secondary,success,danger,warning,info,light,dark|} ${2:Text}"]', '"body": [".alert.alert-${1|primary,secondary,success,danger,warning,info,light,dark|}(role=' + "'alert'" + ') ${2:Content}"]']
    }

    test("getting body of snippet", () => {
        jadePrivate.getSnippets();
        var received:string = sort.removeWhiteCharacters().object(jadePrivate.originalSourceSnippets);
        var expected:String = sort.removeWhiteCharacters().array(dummyData.rawSnippet);
        expect(received).toEqual(expected);
    })

    describe("replace body,parsing, return as string", () => {
        for(let i in dummyData.rawSnippet){
            const prep: string = jadePrivate.prepareToTranslate(dummyData.rawSnippet[i]);
            const received:string = sort.removeWhiteCharacters().string(prep);
            const expected:string = sort.removeWhiteCharacters().string(dummyData.snippet[i]);
            const receivedRegex:RegExpMatchArray = received.match(/body/g);

            test("parsing the string",()=>{
                expect(received).toEqual(expected);
            })

            test("remove body tag from string",()=>{
                expect(receivedRegex).toEqual(null);
            }) 
        }
    })

    test("translating to pug", () => {
        for(let i in dummyData.snippet){
            const prep: string = jadePrivate.translateToJade(dummyData.snippet[i]);
            const received:string = sort.removeWhiteCharacters().string(prep);
            const expected:string = sort.removeWhiteCharacters().string(dummyData.pug[i]);
            expect(received).toEqual(expected);
        }
    })

    test("prepare and translate snippet", () => {
        for(let i in dummyData.rawSnippet){
            const prep: string = jadePrivate.translateSingleSnippet(dummyData.rawSnippet[i]);
            const expected:string = sort.removeWhiteCharacters().string(prep);
            const received:string = sort.removeWhiteCharacters().string(dummyData.pug[i]);
            expect(expected).toEqual(received);
        }
    })

})