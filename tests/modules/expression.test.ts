import Expression from "../../src/modules/expression";

const jadeTranslator = new Expression();

describe("data organzation,connection,sorting", () => {

    const dummyData = {
        string: "The quick brown fox jumps over the lazy dog.",
        object: { "type": "json", "body": "<div></div>" },
        array: ['The', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog.'],
        json: '{ "type": "json", "body": "<div></div>" }',
        regex: /fox/g,
        patern: "fox"
    }

    test("concat 2 arrays", () => {
        const received = jadeTranslator.join("typescript", " governs");
        expect(received).toEqual("typescript governs");
    })

    test("stringify object to json", () => {
        const received = jadeTranslator.stringify(dummyData.object);
        expect(received).toEqual('{"type":"json","body":"<div></div>"}');
    })

    test("create array from string", () => {
        const received = jadeTranslator.createArray(dummyData.string, " ");
        expect(received).toEqual(received);
    })

    test("create string from array", () => {
        const received = jadeTranslator.createString(dummyData.array);
        expect(received).toEqual("Thequickbrownfoxjumpsoverthelazydog.");
    })

    test("Parse json", () => {
        const received = jadeTranslator.parse(dummyData.json);
        expect(received).toEqual({ "type": "json", "body": "<div></div>" });
    })

    test("match string with regex", () => {
        const received = jadeTranslator.match(dummyData.regex, dummyData.string);
        expect(received).toEqual(["fox"]);
    })

    describe("replace part of the string", () => {
        const receivedString = jadeTranslator.replace(dummyData.string, dummyData.patern, "cat");
        const receivedRegex = jadeTranslator.replace(dummyData.string, dummyData.regex, "cat");

        test("Replace using string",()=>{
            expect(receivedString).toEqual("The quick brown cat jumps over the lazy dog.")
        })
        
        test("replaceda using regex",()=>{
            expect(receivedRegex).toEqual("The quick brown cat jumps over the lazy dog.")
        })
    })
})
