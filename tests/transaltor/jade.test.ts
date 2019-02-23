import Jade from "../../src/translators/jade";
const fs: any = require('fs');
const args = {
    source: `${__dirname}/dummydata.json`,
    translatedPath: `${__dirname}`,
    translatedFilename: "/translated.json"
}
const jade = new Jade(args);
const jadePrivate = (jade as any);

describe("test public API", () => {
    const expected = fs.readFileSync(`${__dirname}/example.json`);
    afterAll(() => {
        fs.unlinkSync(`${__dirname}/translated.json`);
    })
    test("translate source to pug", () => {
        jade.translate();
        const read = fs.readFileSync(`${__dirname}/translated.json`);
        expect(read).toEqual(expected);
    })
})

describe("test private API", () => {

    const dummyData = {
        rawSnippet: ['"body": "<span class=\\"badge badge-pill badge-${1|primary,secondary,success,danger,warning,info,light,dark|}\\">${2:Text}</span>"', '"body": [\r\n            "<div class=\\"alert alert-${1|primary,secondary,success,danger,warning,info,light,dark|}\\" role=\\"alert\\">",\r\n            "\\t${2:Content}",\r\n            "</div>"\r\n        ]'],
        rawSnippetLash: ['"body": "<span class=\\"badge badge-pill badge-${1|primary,secondary,success,danger,warning,info,light,dark|}\\">${2:Text}</span>"', '"body": [\r\n            "<div class=\\"alert alert-${1|primary,secondary,success,danger,warning,info,light,dark|}\\" role=\\"alert\\">",\r\n            "${2:Content}",\r\n            "</div>"\r\n        ]'],
        snippet: ['<span class="badge badge-pill badge-${1|primary,secondary,success,danger,warning,info,light,dark|}">${2:Text}</span>', '<div class="alert alert-${1|primary,secondary,success,danger,warning,info,light,dark|}" role="alert">${2:Content}</div>'],
        pug: ['"body": ["span.badge.badge-pill.badge-${1|primary,secondary,success,danger,warning,info,light,dark|} ${2:Text}"]', '"body": [".alert.alert-${1|primary,secondary,success,danger,warning,info,light,dark|}(role=' + "'alert'" + ') ${2:Content}"]']
    }

    test("getting body of snippet", () => {
        jadePrivate.getSnippets();
        expect(jadePrivate.originalSourceSnippets).toEqual(dummyData.rawSnippet);
    })

    test("replace body,parsing, reutrn as string", () => {
        let i: number = 0;
        dummyData.rawSnippetLash.forEach(item => {
            let prep: string = jadePrivate.prepareToTranslate(item);
            expect(prep).toEqual(dummyData.snippet[i]);
            i++;
        })
    })

    test("translateing to pug", () => {
        let i: number = 0;
        dummyData.snippet.forEach(item => {
            let prep: string = jadePrivate.translateToJade(item);
            expect(prep).toEqual(dummyData.pug[i]);
            i++;
        })
    })

    test("prepare and translate snippet", () => {
        let i: number = 0;
        dummyData.rawSnippet.forEach(item => {
            let prep: string = jadePrivate.translateSingleSnippet(item);
            expect(prep).toEqual(dummyData.pug[i]);
            i++;
        })
    })

})