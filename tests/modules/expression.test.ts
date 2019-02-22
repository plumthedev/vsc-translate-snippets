import Expression from "../../src/modules/expression";

const jadeTranslator = new Expression();

describe("data organzation,connect,sorting", () => {

    const dummyData = {
        string: "The quick brown fox jumps over the lazy dog.",
        object: { "type": "json", "body": "<div></div>" },
        array: ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog.'],
        json: '{ "type": "json", "body": "<div></div>" }',
        regex: /fox/g,
        patern: "fox"
    }

    test("concat 2 arrays", () => {
        const string = jadeTranslator.join("typescript", " governs");
        expect(string).toBe("typescript governs");
    })

    test("stringify object to json", () => {
        const json = jadeTranslator.stringify(dummyData.object);
        expect(json).toBe('{"type":"json","body":"<div></div>"}');
    })

    test("create array from string", () => {
        const array = jadeTranslator.createArray(dummyData.string, " ");
        expect(array).toEqual(array);
    })

    test("create string from array", () => {
        const string = jadeTranslator.createString(dummyData.array);
        expect(string).toEqual("Thequickbrownfoxjumpsoverthelazydog.");
    })

    test("Parse json", () => {
        const jsObject = jadeTranslator.parse(dummyData.json);
        expect(jsObject).toEqual({ "type": "json", "body": "<div></div>" });
    })

    test("match string with regex", () => {
        const match = jadeTranslator.match(dummyData.regex, dummyData.string);
        expect(match).toEqual(["fox"]);
    })

    test("replace part of the string", () => {
        const stringString = jadeTranslator.replace(dummyData.string, dummyData.patern, "cat");
        const stringRegex = jadeTranslator.replace(dummyData.string, dummyData.regex, "cat");
        expect(stringRegex).toEqual("The quick brown cat jumps over the lazy dog.")
        expect(stringString).toEqual("The quick brown cat jumps over the lazy dog.")
    })
})
