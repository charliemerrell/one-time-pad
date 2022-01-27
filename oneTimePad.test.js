const { encrypt, decrypt } = require("./oneTimePad");

function makeRandString(length) {
    var result = "";
    var characters = "abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

describe("basic encryption", () => {
    it("should work in the basic case", () => {
        expect(encrypt("aaa", "bbb")).toEqual("bbb");
    });
    it("should work when wrapping occurs", () => {
        expect(encrypt("ccc", "yyy")).toEqual("aaa");
        expect(encrypt("cat", "bhy")).toEqual("dhr");
        expect(encrypt("hello", "xmckl")).toEqual("eqnvz");
    });
});

describe("basic decryption", () => {
    it("should work in the basic case", () => {
        expect(decrypt("ccc", "bbb")).toEqual("bbb");
    });
    it("should work when wrapping occurs", () => {
        expect(decrypt("aaa", "yyy")).toEqual("ccc");
        expect(decrypt("dhr", "bhy")).toEqual("cat");
        expect(decrypt("eqnvz", "xmckl")).toEqual("hello");
    });
});

describe("random recovery", () => {
    for (let i of [1, 10, 100]) {
        it(`should recover random message of length ${i}`, () => {
            let message = makeRandString(i);
            let key = makeRandString(i);
            expect(decrypt(encrypt(message, key), key)).toEqual(message);
        });
    }
});
